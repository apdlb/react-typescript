import { Button, Icon, Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import _ from 'lodash';
import React, { createRef } from 'react';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { cleanEntities, listEntities } from '../../../redux/actions/EntityActions';
import Content from '../../shared/Content';
import EntitiesList from './EntitiesList';

interface MatchParams {}
interface Props extends RouteComponentProps<MatchParams> {
  cleanEntities: Function;
  listEntities: Function;
  entities?: any;
}
interface State {}

class EntitiesContainer extends React.Component<Props, State> {
  state = {
    loading: false,
    searchText: ''
  };

  private searchInput: Input | null = null;

  componentDidMount() {
    this.props.cleanEntities();
    this.props.listEntities();
  }

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...filters
    };
    if (!_.isEmpty(sorter)) {
      params.sort = sorter.field;
      params.order = sorter.order;
    }
    this.props.listEntities(params);
  };

  getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible && this.searchInput) {
        setTimeout(() => (this.searchInput ? this.searchInput.select() : ''));
      }
    },
    render: (text: any) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys: any, confirm: any) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters: any) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render(): React.ReactNode {
    const { paginateEntities } = this.props.entities;
    const { docs, page, limit, totalDocs } = paginateEntities;
    const pagination = {
      current: page,
      pageSize: limit,
      total: totalDocs
    };

    return (
      <>
        <Content
          body={
            <EntitiesList
              component={this}
              propsTable={{
                data: docs,
                pagination,
                loading: this.state.loading,
                handleChange: this.handleTableChange,
                getColumnSearchProps: this.getColumnSearchProps
              }}
            />
          }
        ></Content>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  entities: state.entities
});

export default withRouter(
  connect(
    mapStateToProps,
    { cleanEntities, listEntities }
  )(EntitiesContainer)
);
