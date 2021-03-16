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
    const deleteArticle = articleObject => {
        return fetch(`http://localhost:8088/articles/${articleObject.id}`, {
            method: "DELETE"
        })
        .then(getArticles)
    }

    //grouping articles by Ids
    const getArticleById = (articleObject) => { 
        return fetch(`http://localhost:8088/articles/${articleObject}`)
        .then(res => res.json())
    }
    
    //updating an article 
    const updateArticle = (articleObject) => {
        return fetch(`http://localhost:8088/articles/${articleObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(articleObject)
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