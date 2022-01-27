import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Utils from '../../../common/Utils';
import { ITag } from '../../../Nexus/entities/ITag';
import { useAppSelector } from '../../../store/hooks';

interface IProps {
  tags: string[];
}

export default function TagsAsChips({ tags }: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const renderList = () => {
    const sorted = project.tags
      .slice()
      .sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1));
    return sorted.map((item: ITag) => {
      if (tags.includes(item.id)) {
        return (
          <Badge pill bg="info" key={item.id}>
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
