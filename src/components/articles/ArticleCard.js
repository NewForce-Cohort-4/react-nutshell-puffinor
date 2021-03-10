import React from "react"
import { Link } from "react-router-dom"
import "./Article.css"

export function ArticleCard({ article }) {
    return(
        <section className="article">
        <h3 className="article__title">
        <Link to={`/articles/detail/${article.id}`}>
            {article.title}</Link> 
        </h3>
    </section>
    )
}

