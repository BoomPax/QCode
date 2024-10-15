
class FeaturedProject extends ProjectDisplay{
    constructor(projectData,index) {
        super(projectData,index);
        this.domClass = "featured";
        this.parent = ".featured-project-bar"
        this.loadCode();
        this.updateClass();
        this.appendToDom()
    }
}

function initFeaturedBar(){
    getShareBoardFeaturedProjects(function (projects) {
        let c=0;
        for(let proj of projects) {
            projectDataHeap.push(new FeaturedProject(proj,c));
            c++;
        }
    })
}

