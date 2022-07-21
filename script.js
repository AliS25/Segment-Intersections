// Ali Sbeih - 7/20/22 - Segment Intersections Project



// A class for the nodes
class graphNode {
    // Nodes have the following properties
        name;
        adjacencyList=new Array();
        highlighted=false;
        position=new Array();
    //   A node constructor that initializes its name and position
        constructor(name,position) {
          this.name = name;
          this.position=position; 
        }
      }
      
    
    // Panel representing the graph drawing area
    const panel=document.getElementById('main');
    // An array of the nodes
    let graphList=[];
    // An array of the edges
    let edgeList=[];
    // A counter used for naming
    let counter=0;
    let color='red';
    // Add an event listener that listens for a click and calls the following function 
    panel.addEventListener('click',createCircle)
    
    // -------------------------------------------------------------------CREATE CIRCLE FUNCTION-----------------------------------------------------------------------------
    function createCircle(e){
        // Get the x and y values of the click
            var xPosition = e.clientX - document.body.clientWidth*0.5;
            var yPosition = e.clientY;
    //If the new click overlaps with a previous click don't do anything
    if(checkOverLap(xPosition,yPosition)==true)return;
    
    // Create a new graph node
            let dummyNode=new graphNode(counter,[xPosition,yPosition])
            // Add it to the nodes array
        graphList.push(dummyNode);
    
    // Create an svg cicle element that corresponds to the above node
        const nodeCircle=document.createElementNS("http://www.w3.org/2000/svg", "circle");
    // Give it a radius, color, position, and an id
        nodeCircle.setAttribute('r','5')
        nodeCircle.setAttribute('fill',color)
        nodeCircle.setAttribute('cx',xPosition)
    nodeCircle.setAttribute('cy',yPosition)
    nodeCircle.setAttribute('id',counter)
    
    //Add an event listener that listens for a click and calls the following function
    nodeCircle.addEventListener('click',function(){
        //If the node was originally highlighted, un-highlight it
        if(dummyNode.highlighted==true){
            nodeCircle.setAttribute('stroke-width','0');
            dummyNode.highlighted=false;
                     }
            //Otherwise, highlight it
           else {
            nodeCircle.setAttribute('stroke',nodeCircle.getAttribute("fill"));
            nodeCircle.setAttribute('stroke-width','5')
            dummyNode.highlighted=true;
            //Iterate throgh all the other nodes
            for(let i=0;i<graphList.length;i++){
                //Check that the node is not the same as the current one and that it not a neighbor of the current one and that it is in the same set
                if(graphList[i].name!=nodeCircle.id & dummyNode.adjacencyList.indexOf(graphList[i])==-1 & document.getElementById(graphList[i].name).getAttribute('fill')==nodeCircle.getAttribute('fill')){
                    //Check that the node is highlighted
                if(graphList[i].highlighted==true){
                    //Create an svg line element 
                    const drawLine=document.createElementNS("http://www.w3.org/2000/svg", "line");
                    //Give it the two centers of the nodes to create an edge between them. Give the line a stroke color, type, and width
                    drawLine.setAttribute('x1',xPosition)
                    drawLine.setAttribute('x2',graphList[i].position[0])
                    drawLine.setAttribute('y1',yPosition)
                    drawLine.setAttribute('y2',graphList[i].position[1])
                    drawLine.setAttribute('stroke',nodeCircle.getAttribute("fill"));
                    drawLine.setAttribute('stroke-width','3')
                    //Name the edge as a combination of the names of the two nodes, which are numbers. Name it starting with the smaller number
                    if(Number(graphList[i].name)<Number(nodeCircle.id))drawLine.setAttribute('name',graphList[i].name+''+nodeCircle.id)
                    else drawLine.setAttribute('name',nodeCircle.id+''+graphList[i].name)
                    //Add the edge to the edge list
                    edgeList.push(drawLine); 
    
                    //Add the line to the panel
                   if(nodeCircle.getAttribute("fill")=="red") document.querySelector('.redEdges').appendChild(drawLine)
                   else document.querySelector('.greenEdges').appendChild(drawLine)
    // Add the nodes to each other's adjacency lists
                    dummyNode.adjacencyList.push(graphList[i]);
                    graphList[i].adjacencyList.push(dummyNode);
    // Un-highlight both nodes
                    dummyNode.highlighted=false;
                    graphList[i].highlighted=false;
                    nodeCircle.setAttribute('stroke-width','0');
                    document.getElementById(graphList[i].name).setAttribute('stroke-width','0')

//iterate through the edgelist
                    for(let a=0;a<edgeList.length;a++){
                        //get the x and y coordinates of the line
                        let x1=edgeList[a].getAttribute("x1");
                        let x2=edgeList[a].getAttribute("x2");
                        let y1=edgeList[a].getAttribute("y1");
                        let y2=edgeList[a].getAttribute("y2");
//iterate through the remaining element in the edgelist
                        for(let b=a+1;b<edgeList.length;b++){
                            //check that the lines are not the in the same set
                            if(edgeList[a].getAttribute("stroke")!=edgeList[b].getAttribute("stroke")){
                                //get the x and y coordinates of the line
                            let x3=edgeList[b].getAttribute("x1");
                            let x4=edgeList[b].getAttribute("x2");
                            let y3=edgeList[b].getAttribute("y1");
                            let y4=edgeList[b].getAttribute("y2");
                            //get the slopes
                            let m1;
                            let m2;
                            if(y2>y1) m1=(y2-y1)/(x2-x1)
                            else m1=(y1-y2)/(x1-x2)
                            if(y4>y3) m2=(y4-y3)/(x4-x3)
                            else m2=(y3-y4)/(x3-x4)
                            //get the intercepts
                            let b1=y1-m1*x1;
                            let b2=y3-m2*x3;
                            //get the intersection point
                            let tempX=(b2-b1)/(m1-m2)
                            let tempY=m1*tempX+b1;
                            //check that it is a valid point on both lines
                            if(!((tempX<x3&&tempX<x4)||(tempX>x3&&tempX>x4)||((tempX<x1&&tempX<x2)||(tempX>x1&&tempX>x2)))){
                                if(!((tempY<y3&&tempY<y4)||(tempY>y3&&tempY>y4)||(tempY<y1&&tempY<y2)||(tempY>y1&&tempY>y2))){
//create a circle svg element
        const intersection=document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // Give it a radius, color, position, and an id
            intersection.setAttribute('r','10')
            intersection.setAttribute('fill',"blue")
            intersection.setAttribute('cx',tempX)
        intersection.setAttribute('cy',tempY)
         document.querySelector('.intersections').appendChild(intersection)

                            }

                        }
                    }

                        }
                    }


                    break;
                }
            }
        }
               }
    })
    
    // Add the circle to the panel
    if(nodeCircle.getAttribute("fill")=="red") document.querySelector(".redCircles").appendChild(nodeCircle);
    else panel.appendChild(nodeCircle);
    // increment the counter
    counter++;
    }
    
    
    // -------------------------------------------------------------------OVERLAP FUNCTION----------------------------------------------------------------------------------
    //Function that checks for overlap
    function checkOverLap(xPosition,yPosition){
        //iterate through the graph list
        for(let i=0;i<graphList.length;i++){
            if(xPosition-10<graphList[i].position[0]+10&&xPosition+10>graphList[i].position[0]-10){
                if(yPosition-10<graphList[i].position[1]+10&&yPosition+10>graphList[i].position[1]-10){
        return true;
            }
        }
        }
    return false;
    }
    
    // -------------------------------------------------------------------SWITCH BUTTON----------------------------------------------------------------------
    //switchSet represents the switch button
    const switchSet=document.getElementById('switch');
    //Add an event listener that listens to a click and calls the following function
    switchSet.addEventListener('click',switchFun);
    
    
    function switchFun(){
if(color=='red')color='lime';
else color='red';
    }
    
    // -------------------------------------------------------------------RESET Panel BUTTON--------------------------------------------------------------------------------
    //The variable resetPage refers to the reset button
    const resetPage=document.getElementById('reset');
    //Add an event listener that listens for a  click and calls the following function
    resetPage.addEventListener('click',function(){
        //remove all the elements inside the panel
        while(panel.firstChild!=null){
            panel.removeChild(panel.firstChild);
        }
        //empty the graph list
        graphList=[];
        //empty the edge list
        edgeList=[];
        //reset the counter
        counter=0;
        //Add the g elements in the order that the elements inside of them will be displayed 
        let redEdges=document.createElementNS("http://www.w3.org/2000/svg","g")
        redEdges.setAttribute("class","redEdges")
        document.querySelector('svg').appendChild(redEdges)
        let redCircles=document.createElementNS("http://www.w3.org/2000/svg","g")
        redCircles.setAttribute("class","redCircles")
        document.querySelector('svg').appendChild(redCircles)
        let intersections=document.createElementNS("http://www.w3.org/2000/svg","g")
        intersections.setAttribute("class","intersections")
        document.querySelector('svg').appendChild(intersections)
        let greenEdges=document.createElementNS("http://www.w3.org/2000/svg","g")
        greenEdges.setAttribute("class","greenEdges")
        document.querySelector('svg').appendChild(greenEdges)
    });
