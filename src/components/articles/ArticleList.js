import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticlesProvider"
import { ArticleCard } from "./ArticleCard"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
    const { article, getArticles } = useContext(ArticleContext)

    const [filteredArticles, setFiltered] = useState([])
    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <>
        <h2>Articles</h2>
        <button onClick={() => history.push("/articles/create")}>
            New Article
        </button>
        <div className="articles">
            {filteredArticles.map((singleArticleInLoop) => {
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

