import React, { useState, createContext } from "react"

export const ArticleContext = createContext()

export const ArticleProvider = (props) => {
    const [article, setArticles] = useState([])

    const getArticles = () => {
        return fetch("http://localhost:8088/articles?_expand=user")
        .then(res => res.json())
        .then(setArticles)
    }

    const addArticle = article => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
        .then(response => response.json())
    }

    const deleteArticle = articleId => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "DELETE"
        })
        .then(getArticles)
    }

    const getArticleById = (id) => {
        return fetch(`http://localhost:8088/articles/${id}?_expand=user`)
        .then(res => res.json())
    }
    
    const updateArticle = (article) => {
        return fetch(`http://localhost:8088/articles/${article.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
        .then(getArticles)
    }

    return (
        <ArticleContext.Provider value={{
            article, getArticles, addArticle, getArticleById, deleteArticle, updateArticle
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}