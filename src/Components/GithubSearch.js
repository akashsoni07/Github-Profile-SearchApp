import React, { Component } from 'react'
import axios from 'axios'
import GithubProfile from './GithubProfile'
import GithubRepos from './GithubRepos'
import {clientId,clientSecret} from './GithubCredentials'

 class GithubSearch extends Component {
    constructor(props){
      super(props)
      this.state = {
        username : "",
        profile : {},
        repos : []
      }
    }

    updateInput = (e) =>{
        this.setState({
            ...this.state,
            username : e.target.value
        })
    }

    searchUser = (e) =>{
      e.preventDefault()
      this.searchProfile()
      this.searchRepos()
    }

    searchProfile = () =>{
      axios.get(`https://api.github.com/users/${this.state.username}?clientId=${clientId}&clientSecret=${clientSecret}`)
      .then((response)=>{
          this.setState({
              profile : response.data
          })
      })
      .catch((err)=>{
          console.error(err)
      })
    }

    searchRepos = () =>{
      axios.get(`https://api.github.com/users/${this.state.username}/repos?clientId=${clientId}&clientSecret=${clientSecret}`)
      .then((response)=>{
          this.setState({
              repos : response.data
          })
      })
      .catch((err)=>{
          console.error(err)
      })
    }

    render() {
        return (
            <div>
                <div className="container mt-3">
                  <div className="row">
                    <div className="col">
                      <div className="card">
                        <div className="card-header bg-secondary text-white">
                          <h3>Github User Search</h3>
                        </div>
                        <div className="card-body">
                           <form className="form-inline" onSubmit={this.searchUser} >
                               <div className="form-group">
                                 <input
                                 value={this.state.username}
                                 onChange={this.updateInput}
                                 size="40" 
                                 type="text" 
                                 className="form-control"
                                 placeholder="User Name" />
                               </div>
                               <div className="form-group">
                                 <input type="submit" value="search" className="btn btn-secondary btn-sm" />
                               </div>
                               
                           </form>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                <div className="container mt-3">
                  <div className="row">
                    <div className="col">
                      {
                          Object.keys(this.state.profile).length !== 0 ? 
                          <GithubProfile profile={this.state.profile} /> : null
                      }
                    </div>
                  </div>
                </div>

                <div className="container mt-3">
                  <div className="row">
                    <div className="col">
                      {
                          this.state.repos.length > 0 ? 
                          <GithubRepos repos={this.state.repos} /> : null
                      }
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
export default GithubSearch
