import { Nestable } from '../models/Nestable';
import { IBaseModelWithTitleAndDesc } from '../models/IBaseModelWithTitleAndDesc';
import { Parentable } from '../models/Parentable';
import Utils from './Utils';

interface SearchableParams {
  inSearch?: boolean;
}

type Searchable = SearchableParams & Nestable<IBaseModelWithTitleAndDesc>;

class SearchUtils {
  private static searchRecursive(
    topItem: Nestable<IBaseModelWithTitleAndDesc>,
    searchString: string
  ): Searchable {
    // Returns item as match if searchtext is in the title
    if (topItem.title.toLowerCase().includes(searchString.toLowerCase())) {
      return { ...topItem, inSearch: true };
    }
    // Returns item as no-match if no children
    if (!topItem.children) {
      return { ...topItem, inSearch: false };
    }
    // Recursivly search through children to find matches
    const newChilds = topItem.children
      .map((childItem) => this.searchRecursive(childItem, searchString))
      .filter((childItem) => childItem.inSearch)
      .map((childItem) => {
        const seacrhableTypeItem = { ...childItem };
        delete seacrhableTypeItem.inSearch;
        return seacrhableTypeItem as Nestable<IBaseModelWithTitleAndDesc>;
      });

    // Returns item as no-match if no children has match
    if (newChilds.length === 0) {
      return { ...topItem, inSearch: false };
    }
    // Returns item as match
    return {
      ...topItem,
      children: newChilds,
      inSearch: true
    };
  }

  static search(
    items: Parentable<IBaseModelWithTitleAndDesc>[],
    searchString: string
  ): Parentable<IBaseModelWithTitleAndDesc>[] {
    const nestedItems = Utils.parentable2Nestable(items);
    const returnList = nestedItems
      .map((item) => this.searchRecursive(item, searchString))
      .filter((item) => item.inSearch)
      .map((item) => {
        const seacrhableTypeItem = { ...item };
        delete seacrhableTypeItem.inSearch;
        return seacrhableTypeItem as Nestable<IBaseModelWithTitleAndDesc>;
      });
    return Utils.nestableList2Parentable(returnList);
  }
}

export default SearchUtils;
