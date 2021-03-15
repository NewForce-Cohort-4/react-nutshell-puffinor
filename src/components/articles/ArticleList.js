import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticlesProvider"
import { ArticleCard } from "./ArticleCard"
import { ArticleForm } from "./ArticlesForm"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
    const { article, getArticles, deleteArticle, updateArticle, getArticleById } = useContext(ArticleContext)
    let [showForm, setShowForm] = useState(false)
    const [filteredArticles, setFiltered] = useState([])
    const [editCurrentArticle, setEdit] = useState({
        title: "",
        synopsis: "",
        url: "",
        time: parseInt(Date.now()),
        userId: localStorage.getItem("nutshell_user")
    })

    // listening function when New Article button is clicked to make it appear
    const handleClick = () => {
        const newArticle = showForm
        setShowForm(true)
    }
    //makes the button hidden after you fill out the form 
    const changeState = () => {
        setShowForm(false)
    }

    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])

    //Sorting articles in time order, oldest - newest 
    useEffect(() => {
        const sortedArticles = article.sort((a, b) => b.time - a.time)
        setFiltered(sortedArticles)
    }, [article])

    //function that handles the delete button
    const handleDelete = (articleId) => {
        getArticleById(articleId).then(() => {
            let thisArticle = article.find(a => a.id === articleId)
            deleteArticle(thisArticle)
        })
    }

    //Function for edit
    const handleEdit = (articleId) => {
        getArticleById(articleId).then(() => {
            let thisArticle = article.find(a => a.id === articleId)
            setEdit(thisArticle)
            setShowForm(true)
        })
    }

    return (
        <>
            <h2>Articles</h2>
            <button onClick={() => handleClick()}>
                New Article
        </button>
            {
                //making form appear then disapper after entering info 
                showForm ?
                    <ArticleForm editCurrentArticle={editCurrentArticle} setShowForm={changeState} />
                    : ""
            }

            <div className="articles">
                {filteredArticles.map((article) => {
                    return (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            deleteArticle={() => handleDelete(article.id)}
                            editArticle={() => handleEdit(article.id)}
                        />)
                })}
            </div>
        </>
    )
}

