'use strict';

/**
 * @ngdoc function
 * @name tableOneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tableOneApp
 */
angular.module('tableOneApp')
    .controller('MainCtrl', function ($scope, $window) {

        $scope.levels = [];
        $scope.dropobj = {el:undefined,column:undefined};

        $scope.table = {
            "columns": [{
                name_s: ''
            }, {
                "name_s": "My data",
                "datTyp": "text",
                "children": [{
                    "name_s": "This Month",
//                    dropClass : "drop-col-right",
                    "datTyp": "number"
		}, {
                    "name_s": "This Quarter",
                    "datTyp": "number"
		}, {
                    "name_s": "This Year",
                    "datTyp": "number"
		}]
	}, {
                "name_s": "Diff (This Month - Last Month)",
                "datTyp": "number"
	}, {
                "name_s": "Significance",
                "datTyp": "number"
	}, {
                "name_s": "Highest Region",
                "datTyp": "text"
	}],
            "rows": [{
                "name_s": "Surveys Received"
	}, {
                "name_s": "Satisfaction Scores",
                "children": [{
                    "name_s": "Overall Index",
                    "children": [
                        {
                            "name_s": "Product Offerings"
				}, {
                            "name_s": "Fees"
				}, {
                            "name_s": "Account Information"
				}
			]
		}]
	}, {
                "name_s": "KPIs",
                "children": [{
                    "name_s": "Representative welcomed at branch entrance (% Yes)"
		}, {
                    "name_s": "Did teller/bank representative_Call you by your name (% Yes)"
		}, {
                    "name_s": "Did teller/bank representative_Mention any way the bank can help with financial needs? (% Yes)"
		}, {
                    "name_s": "Review account holdings and offer additional products or services? (% Yes)"
		}]
	}, {
                "name_s": "Loyalty and Retention",
                "children": [{
                    "name_s": "Overall Index",
                    "children": [
                        {
                            "name_s": "Product Offerings"
				}, {
                            "name_s": "Fees"
				}, {
                            "name_s": "Account Information"
				}
			]
		}]
	}]
        }



        //        $scope.table = {
        //            columns: [{name:''},{
        //                name: 'Level 1 : col A',
        //                children: [{
        //                    name: 'Level 2 : col B',
        //                    children: [{
        //                        name: 'Level 3 : col C'
        //                }, {
        //                        name: 'Level 3 : col D'
        //                }]
        //                }, {
        //                    name: 'Level 2 : col E',
        //                    children: [{
        //                        name: 'Level 3 : col F'
        //                }, {
        //                        name: 'Level 3 : col G'
        //                }]
        //                }]
        //            }, {
        //                name: 'Level 1 : col H',
        //                children: [{
        //                    name: 'Level 2 : col I',
        //                    children: [{
        //                        name: 'Level 3 : col J'
        //                }, {
        //                        name: 'Level 3 : col K'
        //                }]
        //                }, {
        //                    name: 'Level 2 : col L',
        //                    children: [{
        //                        name: 'Level 3 : col M'
        //                }, {
        //                        name: 'Level 3 : col N'
        //                }]
        //                }]
        //            }, {
        //                name: 'Level 1 : col O',
        //                children: [{
        //                    name: 'Level 2 : col P',
        //                    children: [{
        //                        name: 'Level 3 : col Q'
        //                }, {
        //                        name: 'Level 3 : col R'
        //                }]
        //                }, {
        //                    name: 'Level 2 : col S',
        //                    children: [{
        //                        name: 'Level 3 : col T'
        //                }, {
        //                        name: 'Level 3 : col U'
        //                }]
        //                }]
        //            }, {
        //                name: 'Level 1 : col V',
        //                children: [{
        //                    name: 'Level 2 : col W',
        //                    children: [{
        //                        name: 'Level 3 : col X'
        //                }, {
        //                        name: 'Level 3 : col Y'
        //                }]
        //                }, {
        //                    name: 'Level 2 : col Z',
        //                    children: [{
        //                        name: 'Level 3 : col A1'
        //                }, {
        //                        name: 'Level 3 : col B1'
        //                }]
        //                }]
        //            }, {
        //                name: 'Level 1 : col C1',
        //                children: [{
        //                    name: 'Level 2 : col D1',
        //                    children: [{
        //                        name: 'Level 3 : col E1'
        //                }, {
        //                        name: 'Level 3 : col F1'
        //                }]
        //                }, {
        //                    name: 'Level 2 : col G1',
        //                    children: [{
        //                        name: 'Level 3 : col H1'
        //                }, {
        //                        name: 'Level 3 : col I1'
        //                }]
        //                }]
        //            }]
        //        };

        $window.tableOne = $scope.table;

        $scope.refresh = function () {
            cleanup($scope.table.columns);
            $scope.levels = [];
            var maxDepth = getMaxDepthVertical($scope.table.columns, 0);
            flatten($scope.table.columns, 0, maxDepth + 1);
            //            addEmptyLevel(maxDepth + 1, getLeafColumnsCount($scope.table.columns));

        };

        var cleanup = function (columns) {
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].children) {
                    cleanup(columns[i].children);
                }
                delete columns[i].rowSpan;
                delete columns[i].colSpan;
                delete columns[i].parentRef;
            }
        };


        var add = function (index, obj) {
            if (!$scope.levels[index]) {
                $scope.levels[index] = [];
            }
            $scope.levels[index].push(obj);
        };

        var getMaxDepthVertical = function (cols, currentDepth) {
            var maxDepth = currentDepth;
            for (var i = 0; i < cols.length; i++) {
                if (cols[i].children) {
                    var newDepth = getMaxDepthVertical(cols[i].children, currentDepth + 1);
                    maxDepth = (maxDepth >= newDepth) ? maxDepth : newDepth;
                }
            }
            return maxDepth;
        };

        var getColSpan = function (column, colSpan) {
            if (column.colSpan) {
                return column.colSpan;
            }

            colSpan = colSpan != undefined ? colSpan : 0;
            if (column.children && column.children.length > 0) {
                for (var i = 0, len = column.children.length; i < len; i++) {
                    var col = column.children[i];
                    colSpan = colSpan + getColSpan(col, colSpan);
                }
            } else {
                return 1;
            }
            return colSpan;
        };

        var addEmptyHeaderRow = function (columns) {
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].children) {
                    addEmptyHeaderRow(columns[i].children);
                } else {
                    columns[i].children = [{
                        name: '',
                        emptyDropEl: true,
                            }]
                }
            }
        };

        //        var addEmptyLevel = function (levelIndex, columnCount) {
        //            for (var i = 0; i < columnCount; i++) {
        //                add(levelIndex, {
        //                    name: '',
        //                    colSpan: 1,
        //                    rowSpan: 1
        //                });
        //            }
        //        };


        var getLeafColumnsCount = function (columns) {
            var count = 0;
            for (var i = 0, len = columns.length; i < len; i++) {
                count = count + columns[i].colSpan;
            }
            return count;
        };

        var flatten = function (columns, levelIndex, maxDepth) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = columns[i];
                if (column.children && column.children.length > 0) {
                    flatten(column.children, levelIndex + 1, maxDepth);
                    column.colSpan = getColSpan(column);
                    column.rowSpan = 1;
                    column.parentRef = columns;
                    add(levelIndex, column);
                } else {
                    column.colSpan = getColSpan(column);
                    column.rowSpan = maxDepth - levelIndex;
                    column.parentRef = columns;
                    add(levelIndex, column);
                }
            }
        };

        //                addEmptyHeaderRow($scope.table.columns);
        var maxDepth = getMaxDepthVertical($scope.table.columns, 0);
        flatten($scope.table.columns, 0, maxDepth + 1);
        //        addEmptyLevel(maxDepth + 1, getLeafColumnsCount($scope.table.columns));
    });