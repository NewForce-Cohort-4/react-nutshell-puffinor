import React, { useState, createContext } from "react"

export const ArticleContext = createContext()

export const ArticleProvider = (props) => {
    const [article, setArticles] = useState([])

// list of articles 
    const getArticles = () => {
        return fetch("http://localhost:8088/articles")
        .then(res => res.json())
        .then(setArticles)
    }

    // adding an article
    const addArticle = (article) => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
        .then(getArticles)
    }

    // delete an article
    const deleteArticle = articleId => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "DELETE"
        })
        .then(getArticles)
    }

    //grouping articles by Ids
    const getArticleById = (id) => {
        return fetch(`http://localhost:8088/articles/${id}?_expand=user`)
        .then(res => res.json())
    }
    
    //updating an article 
    const updateArticle = (articleId) => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(articleId)
        })
        .then(getArticles)
    }

    //exporting all functions for article context 
    return (
        <ArticleContext.Provider value={{
            article, getArticles, addArticle, getArticleById, deleteArticle, updateArticle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}