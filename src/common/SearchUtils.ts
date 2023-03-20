import { Nestable } from '../models/Nestable';
import { IBaseModelWithTitleAndDesc } from '../models/IBaseModelWithTitleAndDesc';
import { Parentable } from '../models/Parentable';
import Utils from './Utils';
import { ICodelist } from '../Nexus/entities/ICodelist';
import { TitleAndDescription } from '../components/DFOSearchBar/DFOSearchBar'; // TODO: This probably needs to go somewhere else
import { CodelistForm } from '../api/nexus2';

interface SearchableParams {
  inSearch?: boolean;
}

type Searchable = SearchableParams & Nestable<IBaseModelWithTitleAndDesc>;

// TODO: Get rid of this class :-D (return only functions)
class SearchUtils {
  private static inTitleOrDescription(
    item: TitleAndDescription,
    searchString: string
  ) {
    const inTitle =
      item.title &&
      item.title.toLowerCase().includes(searchString.toLowerCase());
    const inDescription =
      item.description &&
      item.description.toLowerCase().includes(searchString.toLowerCase());
    return inTitle || inDescription;
  }

  private static searchRecursive(
    topItem: Nestable<IBaseModelWithTitleAndDesc>,
    searchString: string
  ): Searchable {
    // Returns item as match if searchtext is in the title or description
    if (this.inTitleOrDescription(topItem, searchString)) {
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
    // Returns item as match cause match in children
    return {
      ...topItem,
      children: newChilds,
      inSearch: true,
    };
  }

  static searchParentable(
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

  // TODO: can this be removed before I create the pull request?
  static searchBaseModel(
    items: IBaseModelWithTitleAndDesc[],
    searchString: string
  ): IBaseModelWithTitleAndDesc[] {
    return items.filter((item) =>
      this.inTitleOrDescription(item, searchString)
    );
  }

  static searchTitleAndDescription<T extends TitleAndDescription>(
    items: T[],
    searchString: string
  ) {
    return items.filter((item) =>
      this.inTitleOrDescription(item, searchString)
    );
  }

  static searchCodelist(items: ICodelist[], searchString: string): ICodelist[] {
    // Filters only codelist with match in title or with code with match in title
    return items.filter((codelist) => {
      if (this.inTitleOrDescription(codelist, searchString)) {
        return true;
      }

      return codelist.codes.some((code) => {
        return this.inTitleOrDescription(code, searchString);
      });
    });
  }
}

export default SearchUtils;

function inTitleOrDescription(item: TitleAndDescription, searchString: string) {
  const inTitle =
    item.title && item.title.toLowerCase().includes(searchString.toLowerCase());
  const inDescription =
    item.description &&
    item.description.toLowerCase().includes(searchString.toLowerCase());
  return inTitle || inDescription;
}

export function searchCodelist(
  codelists: CodelistForm[],
  searchString: string
): CodelistForm[] {
  // Filters only codelist with match in title or with code with match in title
  return codelists.filter((codelist) => {
    if (inTitleOrDescription(codelist, searchString)) {
      return true;
    }

    return codelist?.codes?.some((code) => {
      return inTitleOrDescription(code, searchString);
    });
  });
}
