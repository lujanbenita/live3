import { TaxonomiesIcon } from "@/icons/IconsLibrary";

const TagTaxonomyLauncher = ({ setOpenModal }) => (
  <div
    className="c-tag-taxonomy-launcher"
    role="button"
    tabIndex={0}
    onKeyPress={() => setOpenModal(true)}
    onClick={() => setOpenModal(true)}
  >
    <TaxonomiesIcon />
  </div>
);

export default TagTaxonomyLauncher;
