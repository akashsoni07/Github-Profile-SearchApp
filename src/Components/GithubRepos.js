import React, { Component } from 'react'

 class GithubRepos extends Component {
    render() {
        return (
            <div>
              <div className="card">
                 <div className="card-header bg-secondary text-white">
                   <h3>Github Repositories</h3>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                     {
                       this.props.repos.length > 0 ? (
                        this.props.repos.map((repo)=>{
                          return (
                             <li className="list-group-item d-flex justify-content-around">
                               <a href={repo.html_url} target="_blank" >{repo.name}</a>
                               <span className="badge badge-success">{repo.stargazers_count} star</span>
                               <span className="badge badge-warning">{repo.watchers_count} watches</span>
                             </li>
                          )
                      })
                       ):null
                     }
                    </ul>
                </div> 
              </div> 
            </div>
        )
    }
}
export default GithubRepos