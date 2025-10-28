
async function getEventByOwner(user_id) {

    const getEventBody = {
        owner_id: user_id,
    };

    const params = new URLSearchParams();
    params.append("owner_id", user_id);

    // get all events with the same owner id
    let data;
    
    try {
        const response = await fetch(`/events?${params}`, {
            //should i make it a post request?
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) {
            throw new Error(response.status)
        }
        data = await response.json();
    }
    catch(error) {
        console.error(error.message);
    }
    return data;
};

async function saveEvent(owner_id, day, month, year, title, index, startTime, endTime) {

    const body =  JSON.stringify({
    owner_id: owner_id,
    day: day,
    month: month,
    year: year,
    title: title,
    index: index,
    startTime: startTime,
    endTime: endTime,
    });
    const response = await fetch('/events', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: body,
    });
}

async function addUser(username, password) {
    
    const body = JSON.stringify({
        username: username,
        password: password
    });
    console.log('adding!')

    try {
        const response = await fetch('/users', {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: body,
        });
        if(response.status==406) {
            return 'Username is already in use';
        }
        if(response.ok) {
            const data = await response.json()
            return data
        }
    }
    catch(error) {
        console.error(error.message);
    }
}

async function checkUser(username, password) {

    const body = JSON.stringify({
        username: username,
        password: password,
    })

    // const params = new URLSearchParams();
    // params.append("username", username);
    // params.append("password", password);

    let data;

    try {
        const response = await fetch(`/checkuser`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: body,
        })
        if (!response.ok) {
            return -1;
        }
        data = await response.json();
        return data;
    }
    catch(error) {
        console.error(error);
    }
}

async function getID() {
    const response = await fetch(`/getID`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
    })
    const data = await response.json();
}

async function searchUsers(username) {

    const body = JSON.stringify({
        username: username
    });

    const response = await fetch(`/searchUsers`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body,
    });
    const data = await response.json();
    return data;
}

async function addRequest(id1, id2) {
    const body = JSON.stringify({
        id1: id1,
        id2: id2,
    })
    const response = await fetch(`/request`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: body,
    });
    const data = response.json();
    return data;
}
async function getFriendRequests(user_id) {
    const response = await fetch(`/incomingRequests`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user_id: user_id,
        })
    });
    const data = response.json();
    return data;

}
async function acceptFriendRequest(requester_id, reciever_id) {
    const response = await fetch(`/reqAccepted`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            requester_id: requester_id,
            reciever_id, reciever_id,
        })
    });
    const data = response.json();
    return data;
}

async function getFriends(user_id) {
    const response = await fetch(`/getFriends`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user_id: user_id
        })
    });
    const data = response.json();
    return data;
}

async function removeFriend(id1, id2) {
    const response = await fetch(`/removeFriend`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id1: id1,
            id2: id2,
        })
    })
    const data = response.json();
    return data;
}

async function compareCalendars(id1, id2, day, month, year) {
    const response = await fetch(`/compareCalendars`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id1: id1,
            id2: id2,
            day: day,
            month: month,
            year: year,
        })
    });
    const data = await response.json();
    return data;
}
async function removeEvent() {
    const response = await fetch(`/event`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: id
        })
    });
    const data = response.json();
    return data;
}



export {getEventByOwner, saveEvent, addUser, checkUser, getID, searchUsers, addRequest, getFriendRequests, acceptFriendRequest, getFriends, removeFriend, compareCalendars, removeEvent};

