import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from './ArticlesProvider'
import { useParams, useHistory } from "react-router-dom"
import "./Article.css"

export const ArticleDetail = () => {
    const { getArticleById, deleteArticle } = useContext(ArticleContext)
    const [article, setArticles] = useState()

    const { articleId } = useParams()
    const history = useHistory()

    //deleating an article function 
    const handleDelete = () => {
        deleteArticle(article.id)
            .then(() => {
                history.push("/articles")
            })
    }

    useEffect(() => {
        getArticleById(articleId)
            .then((response) => {
                setArticles(response)
            })
    }, [])

    return (
        <section className="article">
            <h3 className="article__name">{article.title}</h3>
            <div className="article__synopsis">{article.synopsis}</div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => {
                history.push(`/articles/edit/${article.id}`)
            }}>Edit</button>
        </section>
    )


}