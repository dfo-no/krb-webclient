import { Nestable } from '../models/Nestable';
import { IProduct } from '../Nexus/entities/IProduct';
import { ITag } from '../Nexus/entities/ITag';

interface SearchableParams {
  inSearch?: boolean;
}

type SeacrhableTypes = Nestable<IProduct | ITag>;
type Searchable = SearchableParams & SeacrhableTypes;

// TODO: rewrite to Generic
class SearchUtils {
  private static searchRecursive(
    topItem: SeacrhableTypes,
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
        return seacrhableTypeItem as SeacrhableTypes;
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
    items: SeacrhableTypes[],
    searchString: string
  ): SeacrhableTypes[] {
    return items
      .map((item) => this.searchRecursive(item, searchString))
      .filter((item) => item.inSearch)
      .map((item) => {
        const seacrhableTypeItem = { ...item };
        delete seacrhableTypeItem.inSearch;
        return seacrhableTypeItem as SeacrhableTypes;
      });
  }
}

export default SearchUtils;
