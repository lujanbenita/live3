import { useEffect, useState } from "react";
import { Modal } from "components/common/modal";
import InfiniteScroll from "react-infinite-scroll-component";

import KeyListModalList from "components/keyList/KeyListModalList";
import KeyListItem from "components/keyList/KeyListItem";
import KeyListModalSearch from "components/keyList/KeyListModalSearch";
import KeyListModalConfirmation from "components/keyList/KeyListModalConfirmation";
import SpinnerRing from "components/common/spinner/SpinnerRing";
import { Check } from "icons/IconsLibrary";

const KeyListModal = ({
  addTags,
  fetchList,
  fetchLists,
  open,
  type,
  setOpenModal,
  ...props
}) => {
  const [keyLists, setKeyLists] = useState([]);
  const [selectedKeyList, setSelectedKeyList] = useState(null);
  const [selectedKeyListData, setSelectedKeyListData] = useState(null);
  const [search, setSearch] = useState("");
  const [warning, setWarning] = useState(false);

  const closeModal = () => setOpenModal(false);

  const closeWarning = () => {
    setWarning(false);
  };

  const submitKeyList = () => {
    addTags(selectedKeyListData?.filterParameters);
    closeWarning();
    closeModal();
  };

  const { data, fetchNextPage, hasNextPage } = fetchLists({ size: 10 });

  const filterKeyLists = () =>
    keyLists.filter((keyList) =>
      keyList.filterName.toLowerCase().startsWith(search.toLowerCase())
    );

  const openWarning = async () => {
    const keyListData = await fetchList(selectedKeyList.filterId);
    setSelectedKeyListData(keyListData);
    setWarning(true);
  };

  useEffect(() => {
    if (!data) return;
    const lastPage = data?.pages ? data.pages[data.pages.length - 1] : [];
    setKeyLists(keyLists.concat(lastPage.filters));
  }, [data]);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <Modal
      className="c-modal-keylist"
      onClose={closeModal}
      open={open}
      width={390}
      header={`Load ${type} Key Lists`}
      {...props}
    >
      <div className="c-modal-keylist__wrapper">
        <KeyListModalSearch setSearch={setSearch} />
        <div className="c-modal-keylist__body">
          <div
            className="c-modal-keylist__scroll-container"
            id="scrollableKeyListDiv"
            style={{
              height: 390,
              overflowY: "auto",
            }}
          >
            <p className="c-modal-keylist__keylist-title">Your Keylists</p>
            <InfiniteScroll
              dataLength={keyLists.length}
              loader={<SpinnerRing />}
              next={fetchNextPage}
              hasMore={hasNextPage}
              scrollableTarget="scrollableKeyListDiv"
            >
              <KeyListModalList
                keyLists={filterKeyLists(keyLists)}
                title={type}
                renderItem={(keyList) => (
                  <KeyListItem
                    key={keyList.filterId}
                    item={keyList}
                    selectedKeyList={selectedKeyList}
                    setSelectedKeyList={setSelectedKeyList}
                  />
                )}
              />
            </InfiniteScroll>
          </div>
        </div>
        <div className="c-modal-keylist__footer">
          <button
            type="button"
            className="c-modal-keylist__button"
            onClick={openWarning}
            disabled={!selectedKeyList}
          >
            <Check />
            <span>Apply Key List</span>
          </button>
          <span
            className="c-modal-keylist__cancel"
            role="button"
            tabIndex={0}
            onKeyDown={closeModal}
            onClick={closeModal}
          >
            Cancel
          </span>
        </div>
      </div>
      <KeyListModalConfirmation
        tags={selectedKeyListData?.filterParameters}
        onSubmit={submitKeyList}
        onClose={closeWarning}
        open={warning}
        type={type}
      />
    </Modal>
  );
};

export default KeyListModal;
