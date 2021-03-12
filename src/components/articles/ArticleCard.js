import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import "./Article.css"

// How article is being printed to the DOM 
export function ArticleCard({ article, deleteArticle }) {
    return (
        <section className="article">
            <a href={article.url}className="article__title">{article.title}</a>
            <div className="article__synopsis">Synopsis: {article.synopsis}</div>
            <p>Date: {new Date(article.time).toLocaleDateString('en-US')}</p>
            <button onClick={deleteArticle}>Delete</button>
        </section>
    )
}

