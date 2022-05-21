import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from "components/common/inputs/Checkbox";
import SingleSelector from "components/common/inputs/SingleSelector";
import OptionsButton from "components/common/buttons/OptionsButton";
import Skeleton from "@material-ui/lab/Skeleton";

import { feedSearch } from "redux/search/searchActions";
import {
  exportCSV,
  exportPPT,
  exportPDF,
} from "../../../services/feedServices/exportServices";
import { DARK } from "../../../utils/colors";

const FeedHeader = ({
  openModal,
  select,
  isChecked,
  isLoading,
  selectedArticles,
  infoPagination,
}) => {
  const [orderBy, setOrderBy] = useState("Date");

  const searchObject = useSelector((state) => state.searchObject);
  const user = useSelector((state) => state.user);
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const [showTooltip, setShowTooltip] = useState(false);

  const dispatch = useDispatch();

  const handleSort = (selection) => {
    setOrderBy(selection);
    dispatch(feedSearch({ ...searchObject, sortBy: selection }));
  };

  const idOptionsButton = Buffer.from("FeedHeader").toString("base64");

  useEffect(() => {
    let auxShowTooltip = false;
    if (!selectedArticles) return;
    selectedArticles.map((article) => {
      if (article.articleUrl.includes("nlaapi")) {
        auxShowTooltip = true;
      }
    });
    setShowTooltip(auxShowTooltip);
  }, [selectedArticles]);

  return (
    <div className="c-feed-header">
      <div className="c-feed-header__info">
        <Checkbox onClick={select} isChecked={isChecked} />
        {isLoading ? (
          <Skeleton variant="text" width="200px" />
        ) : (
          <span className="c-feed-header__counter">
            {infoPagination !== undefined && `${infoPagination} articles`}
          </span>
        )}
        {selectedArticles && selectedArticles.length > 0 && (
          <span className="c-feed-header__counter">{`(${selectedArticles.length} selected)`}</span>
        )}
      </div>
      <div className="c-feed-header__selector">
        <SingleSelector
          options={[
            { label: "Date", value: "Date" },
            { label: "Publication Circulation", value: "Circulation" },
            { label: "Article Visibility", value: "Visibility" },
          ]}
          label="ORDER BY"
          value={orderBy}
          handleChange={handleSort}
          className="c-feed-header__order-by-selector"
        />
        <OptionsButton
          id={idOptionsButton}
          color={DARK}
          className="c-feed-header__button"
          options={[
            {
              label: "Bulk tag adding",
              action: () => {
                openModal(true);
              },
              icon: "tags",
              disabled: !selectedArticles || selectedArticles.length === 0,
            },
            {
              label: `Export to PDF`,
              showTooltip,
              action: () => {
                exportPDF(user, dateRange, selectedArticles);
              },
              icon: "export",
              disabled: !selectedArticles || selectedArticles.length === 0,
            },
            {
              label: `Export to PPT`,
              showTooltip,
              action: () => {
                exportPPT(user, dateRange, selectedArticles);
              },
              icon: "export",
              disabled: !selectedArticles || selectedArticles.length === 0,
            },
            {
              label: `Export to CSV`,
              action: () => {
                exportCSV(user, dateRange, selectedArticles);
              },
              icon: "export",
              disabled: !selectedArticles || selectedArticles.length === 0,
            },
          ]}
        />
      </div>
    </div>
  );
};
export default FeedHeader;
