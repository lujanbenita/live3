import useAuthors from "hooks/rq/useAuthors";
import ModalSearchSelector from "components/common/inputs/ModalSearchSelector";
import KeyListModal from "components/keyList/KeyListModal";
import useKeyAuthors from "hooks/rq/useKeyAuthors";
import { fetchAuthorsList } from "services/listsServices/listsServices";

const AuthorsSelector = ({ control, register }) => (
  <ModalSearchSelector
    id="authors-selector"
    className="c-filter-bar__selector"
    fetchFunction={useAuthors}
    control={control}
    title="Authors"
    type="authors"
    name="filterValues.author"
    register={register}
    renderModal={(openModal, setOpenModal, type, addTags) => (
      <KeyListModal
        addTags={addTags}
        fetchLists={useKeyAuthors}
        fetchList={fetchAuthorsList}
        open={openModal}
        type={type}
        setOpenModal={setOpenModal}
      />
    )}
  />
);

export default AuthorsSelector;
