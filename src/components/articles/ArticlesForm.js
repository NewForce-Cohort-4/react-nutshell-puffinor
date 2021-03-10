import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from './ArticlesProvider'
import { useParams, useHistory } from "react-router-dom"
import "./Article.css"

export const ArticleForm = () => {
    const { addArticle, getArticleById, updateArticle } = useContext(ArticleContext)

    const [article, setArticles] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { articleId } = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }

        newArticle[event.target.name] = event.target.value
        setArticles(newArticle)
    }

    const handleSaveArticle = () => {
        setIsLoading(true);
        if (articleId) {
            updateArticle({
                id: article.id,
                title: article.title,
                synopsis: article.synopsis,
                url: article.url
            })
                .then(() => history.push(`/articles/detail/${article.id}`))
        } else {
            addArticle({
                title: article.title,
                synopsis: article.synopsis,
                url: article.url
            })
                .then(() => history.push("/articles"))
        }
    }

    return (
        <form className="articleForm">
            <h2 className="articleForm__title">New Article</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="articleTitle">Article title</label>
                    <input type="text" id="articleTitle" name="title" required autoFocus className="form-control"
                        placeholder="Article Title"
                        onChange={handleControlledInputChange}
                        defaultValue={article.title} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="articlesynopsis">Synopsis</label>
                    <input type="text" id="articleSynopsis" name="synopsis" required autoFocus className="form-control"
                        placeholder="Synopsis"
                        onChange={handleControlledInputChange}
                        defaultValue={article.synopsis} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="articleUrl">URL</label>
                    <input type="text" id="articleUrl" name="url" required autoFocus className="form-control"
                        placeholder="URL"
                        onChange={handleControlledInputChange}
                        defaultValue={article.url} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveArticle()
                }}>
                {articleId ? <>Save Article</> : <>Add Article</>}</button>
        </form >
    )

}
