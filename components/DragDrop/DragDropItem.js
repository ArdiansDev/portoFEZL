import React, { Component } from 'react';
import SortableTree, { changeNodeAtPath, removeNodeAtPath } from '@nosferatu500/react-sortable-tree';
import CustomNodeContentRenderer from './CustomNodeContentRenderer';
import { XCircleIcon } from '@heroicons/react/solid';

export default class DragDropItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          rowHeight={68}
          treeData={this.props.treeData.treeData}
          onChange={treeData => this.props.setTreeData({ treeData })}
          nodeContentRenderer={CustomNodeContentRenderer}
          canNodeHaveChildren={node => node.isSection}
          generateNodeProps={({ node, path }) => ({
            title: (
              node.isSection ?
              <input
                style={{ width: '100%' }}
                value={node.title}
                className="text-base leading-6 font-medium text-gray-900 truncate"
                onChange={event => {
                  const name = event.target.value;

                  this.props.setTreeData(state => ({
                    treeData: changeNodeAtPath({
                      treeData: state.treeData,
                      path,
                      getNodeKey,
                      newNode: { ...node, title: name },
                    }),
                  }));
                }}
              />
              : node.title
            ),
            subtitle: (
              node.subtitle === 'Exam' ? 'Quiz' : node.subtitle === 'DataCollection' ? 'Survey' : node.subtitle
            ),
            buttons: [
                <button
                  onClick={() =>
                    this.props.setTreeData(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }))
                  }
                  className="flex items-center justify-center"
                >
                <XCircleIcon
                  className="text-base-600 w-5"
                />
                </button>,
              ],
          })}
        />
      </div>
    );
  }
}