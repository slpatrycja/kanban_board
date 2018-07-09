class Note {
    constructor(note_, status_) {
        this.note = note_;
        //this.id = id_;
        this.status = status_;
    }
}

class Repository {

    constructor(){}

    get(){
        if (JSON.parse(localStorage.getItem("Notes")) != null)
            var dataObj = JSON.parse(localStorage.getItem("Notes"));
        else
            dataObj = [];

        return dataObj;
    }

    add(item){
        var data = this.get();
        data.push(item);
        var keyValue = "Notes"; 
        localStorage.setItem(keyValue, JSON.stringify(data));
    }

    clear(){
        var data = this.get();
        data.splice(0,data.length);
        var keyValue = "Notes";
        localStorage.setItem(keyValue, JSON.stringify(data));
    }
}