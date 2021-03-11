import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticlesProvider"
import { ArticleCard } from "./ArticleCard"
import { ArticleForm } from "./ArticlesForm"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
    const { article, getArticles } = useContext(ArticleContext)
    let [showForm, setShowForm] = useState(false)

    const handleClick = () => {
        const newArticle = showForm
        setShowForm(true)
    }

     const changeState = () => {
        setShowForm(false)
    }

    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <>
        <h2>Articles</h2>
        <button onClick={() => handleClick()}>
            New Article
        </button>
        {
            showForm ?
                <ArticleForm  setShowForm={changeState}/>
            : ""
        }
        
        <div className="articles">
            {article.map((singleArticleInLoop) => {
                return (
                    <ArticleCard
                    key={singleArticleInLoop.id}
                    article={singleArticleInLoop}
                    />);
            })}
        </div>
        </>
    )
}

