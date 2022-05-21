import axios from "axios";
import { showSuccessNotification } from "../../utils/feedbackBubbles";
import { errorHandler } from "../../utils/errorHandler";

const buildListObject = (listName, list) => ({
  filterName: listName,
  filterParameters: list,
});

export const fetchAuthorsLists = async ({
  pageSize = 30,
  page = 0,
  sortBy = "lastUpdateAt",
  order = "desc",
}) => {
  try {
    const { data } = await axios.get(
      `/api/filters?filterTypes=key_influencers&page=${page}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${order}`
    );

    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const fetchAuthorsList = async (listId) => {
  try {
    const { data } = await axios.get(
      `/api/filters/${listId}?filterParameterTypes=author`
    );
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const updateAuthorsList = async (listId, listName, authors) => {
  const object = buildListObject(listName, authors);

  try {
    const res = await axios.patch(
      `/api/filters/${listId}?filterParameterType=author`,
      object
    );

    if (res.status === 200) {
      showSuccessNotification("The list has been successfully updated");
      return true;
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteAuthorsList = async (listId) => {
  try {
    const res = await axios.delete(
      `/api/filters/${listId}?filterParameterTypes=author`
    );

    if (res.status === 200) {
      showSuccessNotification("The list has been successfully deleted");
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const createAuthorsList = async (listName, authors) => {
  const object = buildListObject(listName, authors);

  try {
    const { status } = await axios.post(
      `/api/filters?filterType=key_influencers&filterParameterType=author`,
      object
    );

    if (status === 201) {
      showSuccessNotification("The list has been successfully created");
      return true;
    }
  } catch (error) {
    errorHandler(error);
  }
};

/* ------------------------------ Publications ------------------------------ */

export const fetchPublicationsLists = async ({
  pageSize,
  page,
  sortBy = "lastUpdateAt",
  order = "desc",
}) => {
  try {
    const { data } = await axios.get(
      `/api/filters?filterTypes=key_media&page=${page}&size=${pageSize}&sortBy=${sortBy}&sortOrder=${order}`
    );

    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const fetchPublicationsList = async (listId) => {
  try {
    const { data } = await axios.get(
      `/api/filters/${listId}?filterParameterTypes=source`
    );
    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const deletePublicationsList = async (listId) => {
  try {
    const res = await axios.delete(
      `/api/filters/${listId}?filterParameterTypes=source`
    );

    if (res.status === 200) {
      showSuccessNotification("The list has been successfully deleted");
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const createPublicationsList = async (listName, publications) => {
  const object = buildListObject(listName, publications);

  try {
    const res = await axios.post(
      `/api/filters?filterType=key_media&filterParameterType=source`,
      object
    );

    if (res.status === 201) {
      showSuccessNotification("The list has been successfully created");
      return true;
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const updatePublicationsList = async (
  listId,
  listName,
  publications
) => {
  const object = buildListObject(listName, publications);

  try {
    const { status } = await axios.patch(
      `/api/filters/${listId}?filterParameterType=source`,
      object
    );

    if (status === 200) {
      showSuccessNotification("The list has been successfully updated");
      return true;
    }
  } catch (error) {
    errorHandler(error);
  }
};
