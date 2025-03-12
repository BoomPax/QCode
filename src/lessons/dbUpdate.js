import {getStoredUser} from "../api/auth";
import {ref} from "firebase/database";
import {db} from "../api/firebase";
import {lessonsIndex, rootLesson} from "./chart";

let updatedStatus = false;

function beginCheckingStatuses(){
    let interval = setInterval(()=>{
        checkStatuses(interval);
    },1000)
}

function checkStatuses(interval){
    if(updatedStatus){
        clearInterval(interval)
        return;
    }
    if( Object.entries(lessonsIndex).length<1){
        return;
    }
    for(let lesson of lessonsIndex){
        if(!lesson.statusChecked){
            console.log(lesson)
            return;
        }
    }
    updatedStatus = true;
    updateAllDb()
}

function updateAllDb(){
    updateLessonStatusDb()
    updateLessonRecommendationsDb()
}

function updateLessonRecommendationsDb() {
    let recs = []
    searchForRecommendation(rootLesson,10,recs)
    set(ref(db,"userdata/"+getStoredUser().uid+"/recommendedLessons"),recs);
}

function searchForRecommendation(lessonId,depth,recs){
    if(depth<1){
        recs.push(lessonId)
    }
    let lesson = lessonsIndex[lessonId]
    for(let childId of lesson.children){
        let child = lessonsIndex[childId];
        if(child===undefined){
            continue;
        }
        if(child.completed) {
            searchForRecommendation(childId, depth - 1,recs);
            continue
        }
        if(child.started) {
            searchForRecommendation(childId, depth - 1,recs);
        }
        recs.push(childId)
    }
}

function updateLessonStatusDb(){
    let statuses = {}
    console.log(lessonsIndex)

    for(let [id,lesson] of Object.entries(lessonsIndex)){
        let status = {
            completed:lesson.completed,
            started:lesson.started,
        }
        statuses[lesson.id] = status;
    }
    set(ref(db,"userdata/"+getStoredUser().uid+"/lessonStatuses"),statuses)
}

export {updateLessonStatusDb,beginCheckingStatuses,searchForRecommendation}