/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from "react";
import { Tree } from "primereact/tree";
import _ from "lodash";
import { fetchTaxonomies } from "services/tagTaxonomy/tagTaxonomy";
import { slugify } from "@/utils/slugify";
import { AddTagIcon } from "@/icons/IconsLibrary";

const TagTaxonomyTree = ({ whitelist, searchTerm, setSearchTerm, addTag }) => {
  const [loading, setLoading] = useState(false);
  const [nodes, setNodes] = useState(null);
  const [expandedKeys, setExpandedKeys] = useState({});
  const [taxonomies, setTaxonomies] = useState([]);

  const onSelect = (node) => {
    if (node.data.level < 4) {
      return;
    }
    addTag(node.data);
  };

  const expandAll = () => {
    const expandNode = (node, _expandedKeys) => {
      if (node.children && node.children.length) {
        _expandedKeys[node.key] = true;

        for (let child of node.children) {
          expandNode(child, _expandedKeys);
        }
      }
    };

    const _expandedKeys = {};
    for (let node of nodes) {
      expandNode(node, _expandedKeys);
    }

    setExpandedKeys(_expandedKeys);
  };

  const collapseAll = () => {
    setExpandedKeys({});
  };

  const generateIds = (taxonomy) => {
    taxonomy.level1Id = slugify(`lv1-${taxonomy.level1}`);
    taxonomy.level2Id = slugify(`${taxonomy.level1Id}-lv2-${taxonomy.level2}`);
    taxonomy.level3Id = slugify(`${taxonomy.level2Id}-lv3-${taxonomy.level3}`);
    taxonomy.level4Id = slugify(`${taxonomy.level3Id}-lv4-${taxonomy.level4}`);
    return taxonomy;
  };

  const createLazyNodes = () => {
    const tree = [];
    const nodesMap = new Map();

    taxonomies.map((taxonomy) => {
      nodesMap.set(taxonomy.level1Id, {
        id: taxonomy.level1Id,
        name: taxonomy.level1,
        level: 1,
      });
    });

    Array.from(nodesMap.values())
      .sort((a, b) =>
        String(a.name.toLowerCase()).localeCompare(b.name.toLowerCase())
      )
      .map((taxonomy) => {
        tree.push({
          key: taxonomy.id,
          icon: "pi pi-fw pi-folder",
          label: taxonomy.name,
          data: taxonomy,
          leaf: false,
        });
      });

    return tree;
  };

  const loadData = () => {
    const fetchData = async () => {
      let taxonomiesQuery = await fetchTaxonomies(whitelist);
      const taxonomiesData = taxonomiesQuery.data.map((taxonomy) =>
        generateIds(taxonomy)
      );
      setTaxonomies(taxonomiesData);
    };
    setLoading(true);
    fetchData();
  };

  useEffect(() => {
    const tree = createLazyNodes();
    setNodes(tree);
    collapseAll();
    setLoading(false);
  }, [taxonomies]);

  const resetTree = () => {
    setSearchTerm("");
    const tree = createLazyNodes();
    setNodes(tree);
    collapseAll();
  };

  const addChildren = (arr, itemId, newNode) => {
    for (let i of arr) {
      if (_.isEqual(i.key, itemId)) {
        let index = arr.findIndex((j) => j.key === itemId);
        arr[index] = newNode;
        break;
      } else {
        addChildren(i?.children ?? [], itemId, newNode);
      }
    }
  };

  const findSearchTerm = (a, b) => a.toLowerCase().startsWith(b.toLowerCase());

  const buildTree = () => {
    const tags = taxonomies.filter(
      (taxonomy) =>
        findSearchTerm(taxonomy.tagName, searchTerm) ||
        findSearchTerm(taxonomy.level3, searchTerm) ||
        findSearchTerm(taxonomy.level2, searchTerm) ||
        findSearchTerm(taxonomy.level1, searchTerm)
    );

    const sortedTags = _.sortBy(tags, ["level1", "level2", "level3", "level4"]);

    if (sortedTags.length > 0) {
      let arrayToTree = (finalArray, item) => {
        let node;

        let currentArray = [
          {
            id: item.level1Id,
            name: item.level1,
            level: 1,
          },
          {
            id: item.level2Id,
            name: item.level2,
            level: 2,
          },
          {
            id: item.level3Id,
            name: item.level3,
            level: 3,
          },
          {
            id: item.level4Id,
            name: item.level4,
            level: 4,
            tagId: item.tagId,
            tagTypeName: item.tagTypeName,
          },
        ];

        // TODO: make recursive function?
        if (!findSearchTerm(item.level4, searchTerm)) {
          currentArray.pop();
          if (!findSearchTerm(item.level3, searchTerm)) {
            currentArray.pop();
            if (!findSearchTerm(item.level2, searchTerm)) {
              currentArray.pop();
            }
          }
        }

        currentArray.forEach((taxonomyNode, index) => {
          const children = index === 0 ? finalArray : node.children;

          if (!children) return;

          let newNode = children.find(
            (child) => child.label === taxonomyNode.name
          );

          if (!newNode) {
            newNode = {
              key: taxonomyNode.id,
              icon: index === 3 ? "" : "pi pi-fw pi-folder",
              label: taxonomyNode.name,
              data: taxonomyNode,
              leaf: taxonomyNode.level === 4,
              ...(index < currentArray.length - 1 ? { children: [] } : {}),
            };

            children.push(newNode);
          }

          node = newNode;
        });

        return finalArray;
      };
      return tags.reduce(arrayToTree, []);
    }
  };

  const createLazyChildNodes = (event, refresh = false) => {
    const clickedTaxonomy = event.node.data;
    const nextLevelTaxonomies = taxonomies.filter(
      (taxonomy) =>
        taxonomy[`level${clickedTaxonomy.level}Id`] === clickedTaxonomy.id
    );
    const nextLevel = clickedTaxonomy.level + 1;
    const nodesMap = new Map();

    nextLevelTaxonomies.map((taxonomy) => {
      const taxonomyData = {
        id: taxonomy[`level${nextLevel}Id`],
        name: taxonomy[`level${nextLevel}`],
        level: nextLevel,
      };
      if (nextLevel === 4) {
        taxonomyData.tagId = taxonomy.tagId;
        taxonomyData.tagTypeName = taxonomy.tagTypeName;
      }
      nodesMap.set(taxonomy[`level${nextLevel}Id`], taxonomyData);
    });

    if (!event.node.children || refresh) {
      let node = { ...event.node };
      node.children = [];

      Array.from(nodesMap.values())
        .sort((a, b) =>
          String(a.name.toLowerCase()).localeCompare(b.name.toLowerCase())
        )
        .map((taxonomy) => {
          node.children.push({
            key: taxonomy.id,
            icon: clickedTaxonomy.level === 3 ? "" : "pi pi-fw pi-folder",
            label: taxonomy.name,
            data: taxonomy,
            leaf: clickedTaxonomy.level === 3 ? true : false,
          });
        });

      let value = [...nodes];
      addChildren(value, event.node.key, node);
      return value;
    }

    return nodes;
  };

  const loadOnExpand = (event, refresh = false) => {
    const fetchData = async () => {
      const tree = createLazyChildNodes(event, refresh);
      setNodes(tree);
    };
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });
  };

  const searchHierarchy = () => {
    const findTags = async () => {
      const tree = buildTree();
      setNodes(tree);
    };
    if (searchTerm.length <= 1) {
      resetTree();
      return;
    }
    setLoading(true);
    findTags().then(() => {
      setLoading(false);
    });
  };

  const toggleNode = (value) => {
    setExpandedKeys(value);
  };

  const nodeTemplate = (node) => (
    <span
      className={`c-tag-taxonomy-tree__${
        node.leaf ? "leaf" : "branch"
      }-wrapper`}
      onClick={() => {
        onSelect(node);
      }}
      onKeyPress={() => {
        onSelect(node);
      }}
      role="button"
      tabIndex={0}
    >
      {node.leaf && <span className="p-treenode-icon pi pi-fw pi-tag"></span>}
      <span className="c-tag-taxonomy-tree__label">{node.label}</span>
      {node.leaf && (
        <span className="c-tag-taxonomy-tree__add-icon">
          <AddTagIcon />
        </span>
      )}
    </span>
  );

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    searchHierarchy();
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length >= 2 && nodes) {
      expandAll();
    }
  }, [nodes, searchTerm]);

  return (
    <Tree
      value={nodes}
      filter={false}
      onExpand={loadOnExpand}
      loading={loading}
      expandedKeys={expandedKeys}
      onToggle={(e) => toggleNode(e.value)}
      nodeTemplate={nodeTemplate}
      className="c-tag-taxonomy-tree"
    ></Tree>
  );
};

export default TagTaxonomyTree;
