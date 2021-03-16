import React, { useContext, useState } from "react"
import { ArticleForm } from "./ArticlesForm"
import "./Article.css"

// How article is being printed to the DOM 
export function ArticleCard({ article, deleteArticle, editArticle }) {
    
    return (
        <section className="article">
            <a href={article.url}className="article__title">{article.title}</a>
            <div className="article__synopsis">Synopsis: {article.synopsis}</div>
            <p>Date: {new Date(article.time).toLocaleDateString('en-US')}</p>
            <button onClick={deleteArticle}>Delete</button>
            <button onClick={editArticle}>Edit</button>
        </section>
    )
}

