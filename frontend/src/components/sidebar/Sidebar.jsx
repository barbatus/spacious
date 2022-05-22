import React from 'react';
import styled from 'styled-components/macro';
import ClipLoader from 'react-spinners/ClipLoader';

import { H2, Hint } from '../text';
import { Icon } from '../icons/Icon';

const Container = styled(({ loading, ...props }) => <div {...props}></div>)`
  display: flex;
  flex-direction: column;
  width: 408px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 24px;

  ${({ loading }) => loading && 'justify-content: center;'}
  ${({ loading }) => loading && 'align-items: center;'}
`;

const Description = styled.p`
  opacity: 0.6;
  margin: 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  ${({scrollable}) => scrollable && `
    flex-grow: 1;
    height: 0;
  `};
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  span {
    opacity: 0.6;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;

  img {
    width: 72px;
    height: 72px;
    margin-right: 16px;
    border-radius: 8px;
  }
`;

const ItemTitle = styled.h4`
  margin: 0;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ActionIcon = styled(Icon)`
  cursor: pointer;
`;

export const Sidebar = React.memo(({
    name,
    description,
    Info,
    listName,
    listData = [],
    emptyMsg,
    loading,
    onClose,
    onListAdd,
  }) => {
  if (loading) {
    return (
      <Container loading>
        <ClipLoader size={64} />
      </Container>
    );
  }

  const items = listData.map(({ id, url, title, hint }) => (
    <ListItem key={id}>
      <img alt="Item Img" src={url}></img>
      <div>
        <ItemTitle>{title}</ItemTitle>
        <Hint>{hint}</Hint>
      </div>
    </ListItem>
  ));
  return (
    <Container>
      <Section>
        <SectionTitle>
          <span></span>
          <ActionIcon name="close" onClick={onClose} />
        </SectionTitle>
        <H2>{name}</H2>
        <Description>{description}</Description>
        {Info}
      </Section>
      <Section scrollable>
        <SectionTitle>
          <span>{listName}</span>
          {onListAdd && <ActionIcon name="add" onClick={onListAdd} />}
        </SectionTitle>
        <ListContainer>
          {!items.length && emptyMsg}
          {items}
        </ListContainer>
      </Section>
    </Container>
  );
});
