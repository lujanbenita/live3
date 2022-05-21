export const useFeedHooks = (
  articles,
  selectedArticles,
  setSelectedArticles
) => {
  const handleSelectArticle = (article, mustBeSelect) => {
    if (selectedArticles) {
      if (mustBeSelect) {
        if (
          !selectedArticles.some(
            (selectedArticle) => selectedArticle.articleId === article.articleId
          )
        ) {
          setSelectedArticles([...selectedArticles, article]);
        }
      } else if (
        selectedArticles.some(
          (selectedArticle) => selectedArticle.articleId === article.articleId
        )
      ) {
        setSelectedArticles((selectedArt) =>
          selectedArt.filter((el) => el.articleId !== article.articleId)
        );
      } else {
        setSelectedArticles([...selectedArticles, article]);
      }
    }
  };

  const isAllArticlesChecked =
    selectedArticles &&
    selectedArticles.length > 0 &&
    selectedArticles.length === articles.length;

  return {
    handleSelectArticle,
    isAllArticlesChecked,
  };
};
