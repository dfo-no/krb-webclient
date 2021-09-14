import React, { ReactElement } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Utils from '../../common/Utils';
import { Tag } from '../../models/Tag';
import { useAppSelector } from '../../store/hooks';

interface IProps {
  tags: string[];
}

export default function TagsAsChips({ tags }: IProps): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const renderList = () => {
    const sorted = project.tags
      .slice()
      .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    return sorted.map((item: Tag) => {
      if (tags.includes(item.id)) {
        return (
          <Badge pill variant="info">
            {Utils.capitalizeFirstLetter(item.title)}
          </Badge>
        );
      }
      return null;
    });
  };

  return (
    <Card className="mb-4 ">
      <Card.Body>{renderList()}</Card.Body>
    </Card>
  );
}
