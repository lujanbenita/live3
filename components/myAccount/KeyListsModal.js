/* eslint-disable no-lonely-if */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import {
  updateAuthorsList,
  createAuthorsList,
  updatePublicationsList,
  createPublicationsList,
} from "services/listsServices/listsServices";
import { fetchOptions } from "services/feedServices/searchServices";

import ControlledCustomMultipleTagsInput from "../common/inputs/ControlledCustomMultipleTagsInput";
import Input from "../common/inputs/Input";
import ModalCard from "../common/modal/ModalCard";
import ScrollListTags from "../common/inputs/ScrollListTags";
import { checkListErrors } from "./utils/validateList";

const KeyListsModal = ({
  handleClose,
  title,
  entity = "authors",
  listDetail,
  updateList,
  isNew,
}) => {
  const [errors, setErrors] = useState([]);
  const [options, setOptions] = useState([]);
  const [isOptionsLoading, setIsOptionsLoading] = useState(false);
  const [totalOptions, setTotalOptions] = useState(0);
  const [elements, setElements] = useState(listDetail.filterParameters || []);
  const [keyListName, setKeyListName] = useState(listDetail.filterName || null);

  const { control, watch, reset } = useForm({
    defaultValues: {
      authors: [],
      publications: [],
    },
  });

  const isAuthor = entity === "authors" ? true : false;

  const authors = watch("authors");
  const publications = watch("publications");

  const handleSearch = useDebouncedCallback(async (query) => {
    setIsOptionsLoading(true);
    const { results, total } = await fetchOptions({
      id: isAuthor ? "author" : "publication",
      query,
      page: 1,
    });

    setIsOptionsLoading(false);
    setTotalOptions(total);

    setOptions(options.length > 0 && results ? [...results] : results || []);
  }, 400);

  const handleLoadMore = async (query, page) => {
    if (options.length >= 30) {
      const { results } = await fetchOptions({
        id: isAuthor ? "author" : "publication",
        query,
        page,
      });

      setOptions(results ? [...options, ...results] : options);
    }
  };

  const addToList = () => {
    if (elements && elements.length)
      entity === "authors"
        ? setElements([
            ...elements,
            ...authors.map((a) => ({ filterParameterValue: a })),
          ])
        : setElements([
            ...elements,
            ...publications.map((a) => ({ filterParameterValue: a })),
          ]);
    else {
      entity === "authors"
        ? setElements([...authors.map((a) => ({ filterParameterValue: a }))])
        : setElements([
            ...publications.map((a) => ({ filterParameterValue: a })),
          ]);
    }
    reset({
      authors: [],
      publications: [],
      keyListName: listDetail.filterName,
    });
  };

  const onSubmit = async () => {
    if (!checkListErrors(keyListName, elements, isAuthor)) {
      if (isAuthor) {
        if (isNew) {
          const successfullyCreated = await createAuthorsList(
            keyListName,
            elements
          );
          if (successfullyCreated) {
            handleClose();
            updateList(0, 30);
          }
        } else {
          const successfullyUpdated = await updateAuthorsList(
            listDetail.filterId,
            keyListName,
            elements
          );
          if (successfullyUpdated) {
            handleClose();
            updateList(0, 30);
          }
        }
      } else {
        if (isNew) {
          const successfullyCreated = await createPublicationsList(
            keyListName,
            elements
          );
          if (successfullyCreated) {
            handleClose();
            updateList(0, 30);
          }
        } else {
          const successfullyUpdated = await updatePublicationsList(
            listDetail.filterId,
            keyListName,
            elements
          );
          if (successfullyUpdated) {
            handleClose();
            updateList(0, 30);
          }
        }
      }
    } else {
      const checkedErrors = checkListErrors(keyListName, elements, isAuthor);
      setErrors(checkedErrors);
    }
  };

  return (
    <ModalCard
      width={670}
      isOpen
      handleClose={() => handleClose()}
      title={title}
      isSubmit
      bodyClassName="c-key-lists-modal"
      onConfirm={() => onSubmit()}
      labelConfirm="Save Changes"
    >
      <div className="c-key-authors-lists__padding">
        <Input
          color="blue"
          className="c-input c-input--full-width c-key-lists-modal__title-input"
          value={keyListName}
          setValue={setKeyListName}
          name="keyListName"
          label="Keylist Name"
          error={errors.find((e) => e.errorName === "keyListName")}
        />
        <ControlledCustomMultipleTagsInput
          control={control}
          colorButton="blue"
          error={errors.find((e) => e.errorName === "elements")}
          className="c-key-authors-lists__custom-select-input"
          name={entity}
          label={`Add new ${entity}`}
          infiniteScroll
          submitCTA="Confirm"
          submitIcon="check"
          isLoading={isOptionsLoading}
          submitAction={addToList}
          getLabel={(author) => author}
          getType={isAuthor ? () => "author" : () => "publication"}
          altSelectedElements={elements}
          getSelectedLabel={(el) => el.filterParameterValue}
          options={options}
          total={totalOptions}
          handleSearch={(query) => {
            handleSearch(query);
          }}
          loadMore={handleLoadMore}
          placeholder={isAuthor ? "add author" : "add publication"}
        />
      </div>
      {listDetail && listDetail.filterParameters && (
        <ScrollListTags
          list={elements}
          getLabel={(element) => element.filterParameterValue}
          maxHeight={262}
          counter={`${elements.length} ${entity} included`}
          handleDelete={(item) => {
            setElements([
              ...elements.filter(
                (el) => el.filterParameterValue !== item.filterParameterValue
              ),
            ]);
          }}
        />
      )}
    </ModalCard>
  );
};

export default KeyListsModal;
