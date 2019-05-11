import React, {Component} from 'react';
import TagApi from "../../../server/TagApi";

class TagList extends Component {

    constructor(props){
        super(props);
        this.state = {
            tags: {}
        };
        this.loadArticleList();
    }

    loadArticleList(){
        TagApi.getTags().then((data) => {
            this.setState({tags: data});
            console.log(data);
        })
    }

    render(){
        return <div>tag</div>
    }
}

export default TagList;