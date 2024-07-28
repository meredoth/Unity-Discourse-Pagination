// This file is part of Unity Discourse Pagination chrome extension.
// Copyright(C) 2024 Giannis Akritidis https://giannisakritidis.com

// Unity Discourse Pagination chrome extension is free software: you can redistribute 
// it and / or modify it under the terms of the GNU General Public License 
// as published by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.If not, see < http://www.gnu.org/licenses/>.

const postsPerPage = 20;
const paginationStyle = "display:flex; justify-content:center; flex-direction:column; padding-top:5rem";
const buttonStyle = "width:2rem; height:2rem; margin: 0.2rem;";

function getCurrentURL() {
    return window.location.href;
}

function createPagination(numberOfPosts, url){
    const main = document.getElementsByClassName("timeline-container")[0];

    function getNumPages() {
        return Math.ceil(numberOfPosts / postsPerPage);
    }

    function getCurrentPost() {
        let currentPost = getCurrentURL().replace(url, '');
        return currentPost.replace('/','');
    }

    function getCurrentPage() {
        let currentPage = Math.ceil(getCurrentPost() / postsPerPage);
        if(isNaN(currentPage)) currentPage = 0;
        return currentPage == 0 ? 1 : currentPage;
    }

    function prevPage() {
        let currentPage = getCurrentPage();
        return currentPage <= 1 ? 1 : ((currentPage - 2) * postsPerPage + 1);
    }

    function nextPage() {
        let currentPage = getCurrentPage(); 
        return currentPage < getNumPages() ? (currentPage * postsPerPage + 1) : (getNumPages() - 1) * postsPerPage + 1;
    }

    function createButton(description, urlFunc) {
        let button = document.createElement('button');
        button.style = buttonStyle;
        button.type = "button";

        let textField = document.createTextNode(description);
        button.appendChild(textField);
        button.addEventListener("click", urlFunc);

        return button;
    }

    if(main){
        let pagination = document.createElement('div');
        pagination.style = paginationStyle;
        pagination.id = 'pagination';
        
        let firstButton = createButton("1", ()=>{ window.location.href = url + '/1'});
        let prevButton = createButton("-1", ()=>{ window.location.href = url + '/' + prevPage()});
        let currentButton = createButton(getCurrentPage(), ()=>{window.location.href = url + '/' + (getCurrentPage()-1) * postsPerPage + 1});
        let nextButton = createButton("+1", ()=>{ window.location.href = url + '/' + nextPage()});
        let lastButton = createButton(getNumPages(), () => { window.location.href = url + '/' + ((getNumPages()-1) * postsPerPage + 1)});

        pagination.appendChild(firstButton);
        pagination.appendChild(prevButton);
        pagination.appendChild(currentButton);
        pagination.appendChild(nextButton);
        pagination.appendChild(lastButton);

        let buttons = [firstButton, prevButton, currentButton, nextButton, lastButton];

        buttons.forEach(button => {
            button.style.visibility = 'visible';
        });

        if(getCurrentPage() == 1) {
            firstButton.style.visibility = 'hidden';
            prevButton.style.visibility = 'hidden';
        }

        if (getCurrentPage() == getNumPages()) {
            lastButton.style.visibility = 'hidden';
            nextButton.style.visibility = 'hidden';
        }
  
        let oldPagination = document.getElementById('pagination')
        oldPagination != null ? oldPagination.replaceWith(pagination) : main.appendChild(pagination);
    }
}

function init() {
    let topicData = getCurrentURL() + ".json";

    fetch(topicData)
    .then((response) => response.json())
    .then((json) => {
        let topicUrl = 'https://discussions.unity.com/t/' + json.slug + '/' + json.id;
        createPagination(json.posts_count, topicUrl);
    });
}

init();
navigation.addEventListener('navigatesuccess', (event) => { init() });