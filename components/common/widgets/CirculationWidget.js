/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Skeleton from "@material-ui/lab/Skeleton";

import { numberFormatter } from "utils/formatters";
import AddButton from "../buttons/AddButton";
import LetterAvatar from "../avatar/LetterAvatar";
import { getPublicationsLists } from "../../../redux/lists/listsActions";
import {
  fetchPublicationsList,
  updatePublicationsList,
} from "../../../services/listsServices/listsServices";

import { limitCharactersWithoutPoints } from "../../../utils/formatters";

const CirculationWidget = ({
  article,
  extraClass = "",
  isLoading,
  isFirstArticle,
  addButtonModal,
}) => {
  const [circulationPercent, setCirculationPercent] = useState();
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const allArticles = useSelector((state) => state.search.feedResults);
  const keyPublicationsLists = useSelector(
    (state) => state.lists.keyPublicationsLists
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (article.circulationSize < 5_000) {
        setCirculationPercent(0);
      }

      if (
        article.circulationSize >= 5_000 &&
        article.circulationSize < 10_000
      ) {
        setCirculationPercent(1);
      }

      if (
        article.circulationSize >= 10_000 &&
        article.circulationSize < 100_000
      ) {
        setCirculationPercent(2);
      }

      if (
        article.circulationSize >= 100_000 &&
        article.circulationSize < 1_000_000
      ) {
        setCirculationPercent(3);
      }

      if (article.circulationSize >= 1_000_000) {
        setCirculationPercent(4);
      }
    }
  }, [allArticles]);

  const handleAddToAuthorsList = async ({ filterId, filterName }) => {
    const { filterParameters } = await fetchPublicationsList(filterId);
    const updatedAuthors = filterParameters.length
      ? [...filterParameters, { filterParameterValue: article.publication }]
      : [{ filterValue: article.author }];

    await updatePublicationsList(filterId, filterName, updatedAuthors);
  };

  const loadOptions = async () => {
    setIsLoadingOptions(true);
    await dispatch(getPublicationsLists({ pageSize: 30, page: 1 }));
    setIsLoadingOptions(false);
  };

  return !isLoading ? (
    <div className={`c-circulation-widget ${extraClass}`}>
      <LetterAvatar>{article.publication}</LetterAvatar>

      <div className="c-circulation-widget__info">
        <div className="c-circulation-widget__publication">
          <span
            title={article.publication}
            className="c-circulation-widget__title"
          >
            {limitCharactersWithoutPoints(article.publication, 20)}
          </span>

          <AddButton
            extraClass="c-circulation-widget__add-button"
            label="Save Publication to Keylist"
            options={keyPublicationsLists}
            isLoadingOptions={isLoadingOptions}
            handleLoadOptions={loadOptions}
            action={(list) => {
              handleAddToAuthorsList(list);
            }}
            noOptionsMessage="Theres is no Key List created, please create a list"
            position={isFirstArticle ? "bottom" : "top"}
            addButtonModal={addButtonModal}
          />
        </div>
        <div className="c-circulation-widget__circulation">
          <div className="c-circulation-widget__graphic-bars">
            <div
              className={`c-circulation-widget__col1 ${
                circulationPercent >= 1
                  ? "c-circulation-widget__col1--filled"
                  : ""
              }`}
            ></div>
            <div
              className={`c-circulation-widget__col2 ${
                circulationPercent >= 2
                  ? "c-circulation-widget__col1--filled"
                  : ""
              }
              `}
            ></div>
            <div
              className={`c-circulation-widget__col3 ${
                circulationPercent >= 3
                  ? "c-circulation-widget__col1--filled"
                  : ""
              }
              `}
            ></div>
            <div
              className={`c-circulation-widget__col4 ${
                circulationPercent >= 4
                  ? "c-circulation-widget__col1--filled"
                  : ""
              }
              `}
            ></div>
          </div>
          <span className="c-circulation-widget__circulation-total">
            {numberFormatter(article.circulationSize)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className={`c-circulation-widget ${extraClass}`}>
      <Skeleton
        variant="circle"
        width="36px"
        height="36px"
        className="c-circulation-widget__avatar"
      />
      <div className="c-circulation-widget__info">
        <div className="c-circulation-widget__publication">
          <Skeleton variant="text" width="100%" />
        </div>
        <div className="c-circulation-widget__circulation">
          <div className="c-circulation-widget__graphic-bars">
            <div className="c-circulation-widget__col1"></div>
            <div className="c-circulation-widget__col2"></div>
            <div className="c-circulation-widget__col3"></div>
            <div className="c-circulation-widget__col4"></div>
          </div>
          <Skeleton
            variant="text"
            width="50px"
            className="c-circulation-widget__circulation-total"
          />
        </div>
      </div>
    </div>
  );
};

export default CirculationWidget;
