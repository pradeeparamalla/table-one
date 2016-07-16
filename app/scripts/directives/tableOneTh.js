'use strict';

angular.module('tableOneApp')

.directive('tableOneTh', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            column: '=',
            dropobj: "=",
            refresh: '&'
        },
        templateUrl: 'views/directives/table-one-th.html',
        link: function (scope, element, attrs, ngModel) {

            scope.handleDragStart = function (event, obj) {
                obj.helper.records = scope.column;
            };


            scope.jqyouiDroppable = {
                onDrop: 'dropHandler',
                onOver: 'overHandler',
                onOut: 'onOutHandler'
            };

            scope.jqyouiDraggable = {
               // placeholder: 'keep',
                onStart: 'handleDragStart',
                onDrag: 'dragHandler'
            };

            scope.dataJqyouiOptions = {
                revert: 'invalid',
                tolerance: 'pointer'
                    //                cursorAt : { left: 5 }
            };

            scope.dropHandler = function (event, uiObj) {
                debugger;
                var dropLocation = scope.column.dropLocation,
                    dragObj = uiObj.helper.records, dropObj = scope.column,
                    dragParent = dragObj.parentRef, dropParent = dropObj.parentRef,
                    indexOfDropObj = dropParent.indexOf(dropObj);
                
                if(dragObj === dropParent){
                    debugger;
                }
                
                _.pull(dragParent,dragObj);
                
                if(dropLocation === "LEFT"){
                    dropParent.splice(indexOfDropObj-1,0,dragObj);
                }else if(dropLocation === "RIGHT"){
                    dropParent.splice(indexOfDropObj+1,0,dragObj);
                }else if(dropLocation === "BOTTOM"){
                    if(!dropObj.children){
                       dropObj.children = [];
                    }
                    dropObj.children.push(dragObj);
                }else if(dropLocation === "TOP"){
                    if(!dropParent.children){
                       dropParent.children = [];
                    }
                    _.pull(dropParent,dropObj);
                    dropParent.push(dragObj);
                    if(!dragObj.children){
                       dragObj.children = [];
                    }
                    dragObj.children.push(dropObj);
                    
                }

                scope.dropobj.el = undefined;
                delete scope.dropobj.column.dropClass;
                scope.dropobj.column = undefined;
                //                scope.$apply();

                scope.refresh();
            };

            scope.overHandler = function (event, uiObj) {
                scope.dropobj.el = event.target;
                scope.dropobj.column = scope.column;
            };

            scope.onOutHandler = function (event, uiObj) {
                console.log(" on onOutHandler");
                resetDropObj();
                scope.$apply();
            };
            
            var resetDropObj = function(){
                scope.dropobj.el = undefined;
                if(scope.dropobj.column){
                    delete scope.dropobj.column.dropClass;
                    delete scope.dropobj.column.dropLocation;
                    scope.dropobj.column = undefined;
                }
            };

            scope.dragHandler = function (event, uiObj) {
                var dropEl = scope.dropobj.el;
                if (dropEl) {
                    var rectObject = dropEl.getBoundingClientRect(),
                        left = rectObject.left,
                        top = rectObject.top,
                        right = rectObject.right,
                        bottom = rectObject.bottom,
                        width = rectObject.width,
                        height = rectObject.height,
                        xPadding = width * 0.33,
                        yPadding = height * 0.33,
                        mouseX = event.clientX,
                        mouseY = event.clientY;
                    console.log("left : " + left + " | top : " + top + " | right : " + right + " | bottom : " + bottom + " | mouseX : " + mouseX + " | mouseY : " + mouseY);

                    if (mouseX > left && mouseX < left + xPadding) {
                        scope.dropobj.column.dropClass = "drop-col-left";
                        scope.dropobj.column.dropLocation = "LEFT";
                        scope.$apply();
                        console.log('insert on LEFT');
                        
                    }else if (mouseX < right && mouseX > right - xPadding) {
                        scope.dropobj.column.dropClass = "drop-col-right";
                        scope.dropobj.column.dropLocation = "RIGHT";
                        scope.$apply();
                        console.log('insert on RIGHT');
                    }else if(mouseY > top && mouseY < top + yPadding) {
                        scope.dropobj.column.dropClass = "drop-col-top";
                        scope.dropobj.column.dropLocation = "TOP";
                        scope.$apply();
                        console.log('insert on TOP');
                    }else if (mouseY < bottom && mouseY > bottom - yPadding) {
                        scope.dropobj.column.dropClass = "drop-col-bottom";
                        scope.dropobj.column.dropLocation = "BOTTOM";
                        scope.$apply();
                        console.log('insert on BOTTOM');
                    }
                }

            };



            scope.actions = [{
                label: 'Delete',
                icon: 'fa-trash-o'
            }, {
                label: 'Add filters',
                icon: 'fa-filter'
            }, {
                label: 'Row color'
            }, {
                label: 'Textcolor'
            }, {
                label: 'Function',
                icon: 'fa-flask'
            }, {
                label: 'Show distribution'
            }, {
                label: 'Indent right',
                icon: 'fa-indent'
            }, {
                label: 'Remove Indent'
            }];

        }
    };
});