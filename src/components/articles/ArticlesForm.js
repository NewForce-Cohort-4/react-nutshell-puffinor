import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from './ArticlesProvider'
import { useParams, useHistory } from "react-router-dom"
import "./Article.css"

export const ArticleForm = ({setShowForm}) => {
    const { addArticle, updateArticle, getArticles } = useContext(ArticleContext)

    //Info for a new article
    const [article, setArticles] = useState({
        title: "",
        synopsis: "",
        url: "",
        time: parseInt(Date.now()),
        userId: localStorage.getItem("nutshell_user")
    })
    const [isLoading, setIsLoading] = useState(true)

    const { articleId } = useParams()
    const history = useHistory()

    // function for data is entered in text feilds 
    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }

        newArticle[event.target.name] = event.target.value
        setArticles(newArticle)
    }
// fucntion when you hit save / update an article 
    const handleSaveArticle = () => {
        let currentUser = localStorage.getItem("nutshell_user")
        setIsLoading(true);
        if (articleId) {
            //update a current article 
            updateArticle({
                id: article.id,
                title: article.title,
                synopsis: article.synopsis,
                url: article.url,
                time: parseInt(Date.now()),
                userId: currentUser
            })
                .then(() => {
                getArticles()
                })
        } else {
            // create a new article 
            addArticle(article)
                .then(() => {
                    setShowForm()
                    getArticles()
            })   
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
                // disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveArticle()
                }}>
                {articleId ? <>Save Article</> : <>Update Article</>}</button>
        </form >
    )

}
