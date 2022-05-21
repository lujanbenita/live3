import usePublications from "hooks/rq/usePublications";
import ModalSearchSelector from "components/common/inputs/ModalSearchSelector";
import KeyListModal from "components/keyList/KeyListModal";
import useKeyPublications from "hooks/rq/useKeyPublications";
import { fetchPublicationsList } from "services/listsServices/listsServices";

const PublicationsSelector = ({ control, register }) => (
  <ModalSearchSelector
    id="publications-selector"
    className="c-filter-bar__selector"
    fetchFunction={usePublications}
    control={control}
    title="Publications"
    type="publications"
    name="filterValues.publication"
    register={register}
    renderModal={(openModal, setOpenModal, type, addTags) => (
      <KeyListModal
        addTags={addTags}
        fetchLists={useKeyPublications}
        fetchList={fetchPublicationsList}
        open={openModal}
        type={type}
        setOpenModal={setOpenModal}
      />
    )}
  />
);

export default PublicationsSelector;
