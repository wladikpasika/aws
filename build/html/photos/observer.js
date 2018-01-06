function Publisher() {
    var subscribes = {

    };
    function subscribe (type, fn){
        if(!subscribes[type]){
        subscribes[type] = [];
    }
    if(subscribes[type].indexOf(fn) == -1){
        subscribes[type].push(fn);

    }
    };
    function unsubscribe (type, fn){

        if(!subscribes[type]){
            return;
        };

        var index = subscribes[type].indexOf(fn); console.log(index);

        if(index>-1){
            subscribes[type].splice(index,1);
        }



    };
    function publish (type, evtObj){

        if(!subscribes[type]){
            return;
        };

        if(!evtObj.type){
            evtObj.type = type;

        };
        var listeners = subscribes[type];

        for(var a=0, b=listeners.length; a<b; a++){
            listeners[a](evtObj)

        }

    };
    return {
        subscribe:subscribe,
        unsubscribe:unsubscribe,
        publish:publish
    };
};

function fo (evt){
    console.log(evt.message);

}

var evtman = new Publisher;
evtman.subscribe('test',fo);
evtman.publish('test',{message:'loo'});

