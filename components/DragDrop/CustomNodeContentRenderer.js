import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isDescendant } from './utils/tree-data-utils';
import classnames from './utils/classnames';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ViewGridIcon,
} from '@heroicons/react/solid';

class NodeRendererDefault extends Component {
  getSubtitle = (name) => {
    switch (name) {
      case 'DataCollection':
        return 'Survey';
      case 'Exam':
        return 'Quiz';
      default:
        return name;
    }
  };
  render() {
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      itemType,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      buttons,
      className,
      style,
      didDrop,
      treeId,
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.title;
    const nodeSubtitle = itemType || node.itemType;
    const rowDirectionClass = rowDirection === 'rtl' ? 'rst__rtl' : null;

    let handle;
    if (canDrag) {
      if (typeof node.children === 'function' && node.expanded) {
        // Show a loading symbol on the handle when the children are expanded
        //  and yet still defined by a function (a callback to fetch the children)
        handle = (
          <div className="rst__loadingHandle">
            <div className="rst__loadingCircle">
              {[...new Array(12)].map((_, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={classnames(
                    'rst__loadingCirclePoint',
                    rowDirectionClass
                  )}
                />
              ))}
            </div>
          </div>
        );
      } else {
        // Show the handle used to initiate a drag-and-drop
        handle = connectDragSource(
          <div>
            <ViewGridIcon
              className="text-current w-5 cursor-pointer"
              fill="gray"
            />
          </div>,
          {
            dropEffect: 'copy',
          }
        );
      }
    }

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;

    let buttonStyle = { left: -0.5 * scaffoldBlockPxWidth };
    if (rowDirection === 'rtl') {
      buttonStyle = { right: -0.5 * scaffoldBlockPxWidth };
    }

    let widthNode = 630 - (path.length > 1 ? scaffoldBlockPxWidth : 0);

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...otherProps}
      >
        <div className={classnames('rst__rowWrapper', rowDirectionClass)}>
          {/* Set the row preview to be used during drag and drop */}
          {connectDragPreview(
            <div
              className={classnames(
                'rst__row',
                isLandingPadActive && 'rst__rowLandingPad',
                isLandingPadActive && !canDrop && 'rst__rowCancelPad',
                isSearchMatch && 'rst__rowSearchMatch',
                isSearchFocus && 'rst__rowSearchFocus',
                rowDirectionClass,
                className
              )}
              style={{
                opacity: isDraggedDescendant ? 0.5 : 1,
                ...style,
              }}
            >
              <div
                className={classnames(
                  'height-68 border border-gray-300 border-solid rounded-6 p-2.5 flex space-between items-center justify-center',
                  !canDrag && 'rst__rowContentsDragDisabled',
                  rowDirectionClass
                )}
                style={{ width: widthNode }}
              >
                <div className="w-full flex items-center gap-2">
                  {handle}
                  <div className={'flex gap-1 flex-col w-full pr-8'}>
                    <span
                      className={`text-base leading-6 font-medium text-gray-900 truncate`}
                    >
                      {typeof nodeTitle === 'function'
                        ? nodeTitle({
                            node,
                            path,
                            treeIndex,
                          })
                        : nodeTitle}
                    </span>

                    {nodeSubtitle && (
                      <span className="text-sm leading-5 font-normal text-gray-500">
                        {typeof nodeSubtitle === 'function'
                          ? nodeSubtitle({
                              node,
                              path,
                              treeIndex,
                            })
                          : this.getSubtitle(nodeSubtitle)}
                      </span>
                    )}
                  </div>
                </div>

                {toggleChildrenVisibility &&
                  node.children &&
                  (node.children.length > 0 ||
                    typeof node.children === 'function') && (
                    <div>
                      {node.expanded ? (
                        <ChevronDownIcon
                          className={classnames(
                            'text-base-400 w-6 h-6 cursor-pointer'
                          )}
                          onClick={() =>
                            toggleChildrenVisibility({
                              node,
                              path,
                              treeIndex,
                            })
                          }
                        />
                      ) : (
                        <ChevronRightIcon
                          className={classnames(
                            'text-base-400 w-6 h-6 cursor-pointer'
                          )}
                          onClick={() =>
                            toggleChildrenVisibility({
                              node,
                              path,
                              treeIndex,
                            })
                          }
                        />
                      )}
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>
        <div className="rst__rowToolbar">
          {buttons.map((btn, index) => (
            <div
              key={index} // eslint-disable-line react/no-array-index-key
              className="rst__toolbarButton"
            >
              {btn}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

NodeRendererDefault.defaultProps = {
  isSearchMatch: false,
  isSearchFocus: false,
  canDrag: false,
  toggleChildrenVisibility: null,
  buttons: [],
  className: '',
  style: {},
  parentNode: null,
  draggedNode: null,
  canDrop: false,
  title: null,
  itemType: null,
  rowDirection: 'ltr',
};

NodeRendererDefault.propTypes = {
  node: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  itemType: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,
  isSearchMatch: PropTypes.bool,
  isSearchFocus: PropTypes.bool,
  canDrag: PropTypes.bool,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  toggleChildrenVisibility: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.node),
  className: PropTypes.string,
  style: PropTypes.shape({}),

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  isDragging: PropTypes.bool.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  // Drop target
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,

  // rtl support
  rowDirection: PropTypes.string,
};

export default NodeRendererDefault;
