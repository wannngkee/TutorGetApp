/*!@license
 * Infragistics.Web.ClientUI Grid Merged Cells 20.1.14
 *
 * Copyright (c) 2011-2020 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 * Depends on:
 *	jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.util.js
 *	infragistics.ui.widget.js
 *	infragistics.dataSource.js
 *	infragistics.ui.grid.framework.js
 *	infragistics.ui.shared.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.ui.grid.framework"],factory)}else{return factory(jQuery)}})(function($){"use strict";$.widget("ui.igGridCellMerging",$.ui.igWidget,{localeWidgetName:"CellMerging",css:{mergedCellsTop:"ui-iggrid-mergedcellstop",mergedCellsBottom:"ui-iggrid-mergedcellsbottom",mergedCell:"ui-iggrid-mergedcell",physicallyMergedCell:"ui-iggrid-physicalmergedcell"},options:{mergeType:"visual",mergeOn:"sorting",mergeStrategy:"duplicate",rowMergeStrategy:"duplicate",mergeRows:false,columnSettings:[{columnIndex:-1,columnKey:null,mergeOn:"sorting",mergeStrategy:"duplicate"}],inherit:false},events:{cellsMerging:"cellsMerging",cellsMerged:"cellsMerged"},_createWidget:function(){this.options.columnSettings=[];$.Widget.prototype._createWidget.apply(this,arguments)},_setOption:function(opt){if(opt==="mergeType"){throw new Error(this._getLocaleValue("optionChangeNotSupported").replace("{optionName}",opt))}$.Widget.prototype._setOption.apply(this,arguments);switch(opt){case"mergeOn":case"mergeStrategy":case"columnSettings":this._unmergeColumns();this._initColumnSettings();this._createModel();this._mergeColumns();break;case"mergeRows":this._createRowMergeModel();this.grid.dataBind();break}},changeGlobalLanguage:function(){},changeGlobalRegional:function(){},destroy:function(){this._unmergeRows();this._unmergeColumns();this._unregisterEvents();this._superApply(arguments);return this},mergeColumn:function(column,raiseEvents){var key=this._normalizeColumnId(column);if(!this.isMerged(key)){this._mergeColumn(key,raiseEvents)}return this.element},unmergeColumn:function(column){var key=this._normalizeColumnId(column);if(this.isMerged(key)){this._unmergeColumn(key);this._mergingModel[key].merged=false}return this.element},isMerged:function(column){return this._mergingModel[this._normalizeColumnId(column)].merged},mergeRow:function(id,fireEvents){var pkProp=this.grid.options.primaryKey,dv=this.grid._getDataView(),sri=this.grid._startRowIndex||0,tbody=this.grid.element.children("tbody"),row;if(!tbody){tbody=this.grid.fixedTable().children("tbody")}if(pkProp===null){var index=parseInt(id);if(!isNaN(index)){if(index-sri>=0){row=tbody.find("tr").eq(index-sri);this._mergeRow(index,row,fireEvents)}this._rowMergingModel[index]=true;return}}var rowIndex=-1;for(var i=0;i<dv.length;i++){if(dv[i][pkProp]===id){rowIndex=i;break}}row=tbody.find("tr[data-id='"+id+"']").eq(0);this._mergeRow(rowIndex,row,fireEvents);this._rowMergingModel[rowIndex]=true},unmergeRow:function(id,index){var pkProp=this.grid.options.primaryKey,dv=this.grid._getDataView(),sri=this.grid._startRowIndex||0,tbody=this.grid.element.children("tbody");if(!tbody){tbody=this.grid.fixedTable().children("tbody")}var row=null;if(id===null&&index!==null&&!isNaN(parseInt(index))){if(index-sri>=0){row=tbody.find("tr").eq(index-sri);this._unmergeRow(row)}this._rowMergingModel[index]=false;return}row=tbody.find("tr[data-id='"+id+"']").eq(0);this._unmergeRow(row);for(var i=0;i<dv.length;i++){if(dv[i][pkProp]===id){this._rowMergingModel[i]=false;break}}},_gridRendered:function(){this._mergeColumns();this._rowMergingModel=null;this._mergeRows()},_rrn:function(){this._mergeColumns();this._unmergeRows();this._mergeRows()},_rcn:function(){this._mergeColumns();this._unmergeRows();this._mergeRows()},_columnsCollectionModified:function(){this._mergeColumns();this._mergeRows()},_sortedColumnsChanging:function(expressions){var key,settings=this._columnSettings,model=this._mergingModel,prevColumns=this._prevSortedColumns,sortedColumns=this._getSortedColumns(expressions);for(key in sortedColumns){if(sortedColumns.hasOwnProperty(key)&&!prevColumns[key]&&settings[key].mergeOn==="sorting"){model[key].merged=true}}for(key in prevColumns){if(prevColumns.hasOwnProperty(key)&&!sortedColumns[key]&&settings[key].mergeOn==="sorting"){model[key].merged=false}}this._prevSortedColumns=sortedColumns},_internalRowAdded:function(){this._unmergeRows();this._unmergeColumns();this._mergeColumns();this._mergeRows()},_internalRowDeleted:function(){this._unmergeRows();this._unmergeColumns();this._mergeColumns();this._mergeRows()},_internalCellUpdated:function(args){var column=this.grid.getColumnByTD(args.cell);if(column&&column.column){this._unmergeColumn(column.column.key);if(this._mergingModel[column.column.key].merged){this._mergeColumn(column.column.key,true)}}},_internalRowUpdated:function(){this._unmergeRows();this._unmergeColumns();this._mergeColumns();this._mergeRows()},_rowExpanded:function(){this._unmergeRows();this._unmergeColumns();this._mergeColumns();this._mergeRows()},_rowCollapsed:function(){this._unmergeRows();this._unmergeColumns();this._mergeColumns();this._mergeRows()},_createModel:function(){var cols=this.grid.options.columns,key,colSetting,columnModel,i,mergingModel=this._mergingModel={},sortedColumns=this._getSortedColumns();for(i=0;i<cols.length;i++){key=cols[i].key;columnModel=mergingModel[key]={};colSetting=this._columnSettings[key];if(colSetting.mergeOn==="always"||colSetting.mergeOn==="sorting"&&sortedColumns[key]){columnModel.merged=true}else{columnModel.merged=false}if($.type(colSetting.mergeStrategy)==="function"){columnModel.fn=colSetting.mergeStrategy}else{switch(colSetting.mergeStrategy){case"duplicate":columnModel.fn=this._mergeDuplicate;break;case"null":columnModel.fn=this._mergeNull;break;default:if($.type(window[colSetting.mergeStrategy])==="function"){columnModel.fn=$.proxy(window[colSetting.mergeStrategy],this);break}throw new Error(this._getLocaleValue("mergeStrategyNotAFunction"))}}}},_createRowMergeModel:function(){var dv=this.grid._getDataView(),i;this._rowMergingModel=[];for(i=0;i<dv.length;i++){this._rowMergingModel[i]=this.options.mergeRows}},_initColumnSettings:function(){var i,columns,columnSettings,columnSetting,settings,setting,o=this.options;columns=this.grid.options.columns;columnSettings=o.columnSettings;settings=this._columnSettings={};for(i=0;i<columns.length;i++){settings[columns[i].key]={mergeStrategy:o.mergeStrategy,mergeOn:o.mergeOn}}for(i=0;i<columnSettings.length;i++){columnSetting=columnSettings[i];if(columnSetting.columnKey){setting=settings[columnSetting.columnKey]}else if($.type(columnSetting.columnIndex)){setting=settings[columns[columnSetting.columnIndex].key]}else{continue}setting.mergeOn=columnSetting.mergeOn||setting.mergeOn;setting.mergeStrategy=columnSetting.mergeStrategy||setting.mergeStrategy}},_getSortedColumns:function(expressions){var i,sExp=expressions||this.grid.dataSource.settings.sorting.expressions,sortedColumns={};for(i=0;i<sExp.length;i++){sortedColumns[sExp[i].fieldName]=true}return sortedColumns},_normalizeColumnId:function(column){return $.type(column)==="number"?this.grid.options.columns[column].key:column},_hasVirtualization:function(){return this.grid.options.virtualization||this.grid.options.rowVirtualization||this.grid.options.columnVirtualization},_hasGroupedColumns:function(){var groupBy=this.grid.element.data("igGridGroupBy");return groupBy&&groupBy.options&&groupBy.options.groupedColumns&&groupBy.options.groupedColumns.length>0},_dataRows:function(fixed,both){var table;if(both){table=this.grid.element.add(this.grid.fixedTable())}else{table=fixed?this.grid.fixedTable():this.grid.element}return table.children("tbody").children("tr:not([data-container='true'],[data-grouprow='true'],[data-summaryrow='true'])")},_addDummyGroupElements:function(dv,elements){var i,startIndex=this.grid._startRowIndex||0,endIndex=startIndex+this.grid._virtualRowCount||dv.length,visibleDv=dv.slice(startIndex,endIndex);for(i=0;i<visibleDv.length;i++){if(visibleDv[i].__gbRecord||visibleDv[i].__gbSummaryRecord){elements.splice(i,0,$())}}},_addDummyChildGridElements:function(tbody,dv,elements){var childGridContainerRows=tbody.children("tr[data-container]:visible"),i,row,index,allVisibleRows=tbody.children("tr:visible");for(i=0;i<childGridContainerRows.length;i++){row=childGridContainerRows.eq(i);index=allVisibleRows.index(row);elements.splice(index,0,$());dv.splice(index,0,$())}},_mergeDuplicate:function(prevRec,curRec,columnKey){if($.type(prevRec[columnKey])==="string"&&$.type(curRec[columnKey])==="string"&&this.grid.dataSource.settings.sorting.caseSensitive===false){return prevRec[columnKey].toLowerCase()===curRec[columnKey].toLowerCase()}var column=this.grid.columnByKey(columnKey);if(column.dataType==="time"){return this._mergeDuplicateTime(prevRec,curRec,columnKey)}return prevRec[columnKey]===curRec[columnKey]},_mergeDuplicateTime:function(prevRec,curRec,columnKey){var dataSourcePrimaryKey=this.grid.options.primaryKey,prevRecCellText=this.grid.getCellText(prevRec[dataSourcePrimaryKey],columnKey),curRecCellText=this.grid.getCellText(curRec[dataSourcePrimaryKey],columnKey);return prevRecCellText===curRecCellText},_mergeNull:function(prevRec,curRec,columnKey){return curRec[columnKey]===null},_rowMergeDuplicate:function(columnKey1,columnKey2,record){if(!record){return false}if($.type(record[columnKey1])==="string"&&$.type(record[columnKey2])==="string"&&this.grid.dataSource.settings.sorting.caseSensitive===false){return record[columnKey1].toLowerCase()===record[columnKey2].toLowerCase()}return record[columnKey1]===record[columnKey2]},_rowMergeNull:function(columnKey1,columnKey2,record){return record[columnKey2]===null},_isCellVerticallyMerged:function(cell){return cell.hasClass(this.css.mergedCellsTop)||cell.hasClass(this.css.mergedCellsBottom)||cell.hasClass(this.css.mergedCell)||cell.hasClass(this.css.physicallyMergedCell)},_mergeRows:function(){var sri=this.grid._startRowIndex||0,frows,rows,i;if(!this.options.mergeRows){return}if(!this._rowMergingModel){this._createRowMergeModel()}rows=this._dataRows(false);frows=this._dataRows(true);for(i=0;i<rows.length;i++){if(this._rowMergingModel[i+sri]){this._mergeRow(i,rows.eq(i),true);if(frows.length){this._mergeRow(i,frows.eq(i),true)}}}},_mergeRow:function(i,row,fireEvents){var curRec,noCancel,rms,pkProp=this.grid.options.primaryKey,dv=this.grid._getDataView(),sri=this.grid._startRowIndex||0,visibleColumns=this.grid._visibleColumns(),colspan,cellsToMerge;switch(this.options.rowMergeStrategy){case"duplicate":rms=this._rowMergeDuplicate;break;case"null":rms=this._rowMergeNull;break;default:if(typeof this.options.rowMergeStrategy==="function"){rms=this.options.rowMergeStrategy;break}throw new Error(this._getLocaleValue("mergeStrategyNotAFunction"))}var cells=$(row).find("td:not([data-skip='true'],td[data-parent])");for(var j=0;j<cells.length-1;j++){var currentCell=cells.eq(j);var nextCell=cells.eq(j+1);colspan=1;cellsToMerge=[];curRec=dv[i+sri];if(rms.apply(this,[visibleColumns[j].key,visibleColumns[j+colspan].key,curRec])&&nextCell.css("display")!=="none"&&!this._isCellVerticallyMerged(currentCell)&&!this._isCellVerticallyMerged(nextCell)){while(j+colspan<visibleColumns.length&&rms.apply(this,[visibleColumns[j].key,visibleColumns[j+colspan].key,curRec])&&currentCell.css("display")!=="none"&&nextCell.css("display")!=="none"&&!this._isCellVerticallyMerged(currentCell)&&!this._isCellVerticallyMerged(nextCell)){cellsToMerge.push(nextCell);colspan++;nextCell=cells.eq(j+colspan)}var args={orientation:"horizontal",owner:this,row:currentCell.parent(),rowIndex:i,rowId:pkProp?curRec[pkProp]:null,firstColumnKey:visibleColumns[j].key,columnKey:visibleColumns[j+colspan-1].key,record:curRec};if(fireEvents){noCancel=this._trigger(this.events.cellsMerging,null,args)}if(noCancel===false){continue}for(var k=0;k<cellsToMerge.length;k++){cellsToMerge[k].attr("aria-rowmerged","true");cellsToMerge[k].css("display","none")}currentCell.attr("colspan",colspan);if(fireEvents){args.count=colspan;this._trigger(this.events.cellsMerged,null,args)}}}},_unmergeRows:function(){var rows=this._dataRows(null,true),i;for(i=0;i<rows.length;i++){this._unmergeRow(rows.eq(i))}},_unmergeRow:function(row){var cells=row.find("td");cells.each(function(i,c){var cell=$(c);if(typeof cell.attr("colspan")!=="undefined"){cell.removeAttr("colspan");return}if(typeof cell.attr("aria-rowmerged")!=="undefined"){cell.removeAttr("aria-rowmerged");cell.css("display","table-cell")}})},_mergeColumns:function(){var i,key,visibleColumns=this.grid._visibleColumns();if(this.options.mergeType==="physical"&&this._hasVirtualization()&&this.grid.options.virtualizationMode==="fixed"){this._unmergeColumns()}for(i=0;i<visibleColumns.length;i++){key=visibleColumns[i].key;if(this._mergingModel[key].merged){this._mergeColumn(key,true)}}},_mergeColumn:function(key,raiseEvents){var cellAria=this.grid.id()+"_"+key,dv=this.grid._getDataView(),cells,startCell,merging=false,count=0,i,tbody,args,noCancel,prevRec,curRec,prevCell,curCell,pkProp=this.grid.options.primaryKey,sri=this.grid._startRowIndex||0,vrc=this.grid._virtualRowCount||dv.length;if(this.grid.hasFixedColumns()&&this.grid.isFixedColumn(key)){tbody=this.grid.fixedTable().children("tbody")}else{tbody=this.grid.element.children("tbody")}cells=tbody.find("tr>td[aria-describedby='"+cellAria+"']:not([gbsummarycell])");if(this._hasGroupedColumns()){this._addDummyGroupElements(dv,cells)}if(this.grid._isHierarchicalGrid){dv=dv.slice(0);this._addDummyChildGridElements(tbody,dv,cells)}i=sri>0?sri-1:0;prevCell=this.options.mergeType==="visual"?i-sri<0?$():cells.eq(i-sri):cells.eq(0);prevRec=dv[i++];for(i;i<dv.length&&i<sri+vrc+1;i++){curRec=dv[i];curCell=cells.eq(i-sri);if(this._mergingModel[key].fn.apply(this,[prevRec,curRec,key])){if(!merging){args={orientation:"vertical",owner:this,row:prevCell.parent(),rowIndex:i-sri,rowId:pkProp?prevRec[pkProp]:null,columnKey:key,firstRecord:prevRec,record:curRec};if(raiseEvents){noCancel=this._trigger(this.events.cellsMerging,null,args)}if(noCancel===false){prevCell=curCell;prevRec=curRec;continue}if(this.options.mergeType==="visual"&&prevCell.length){prevCell.addClass(this.css.mergedCellsTop)}if(prevCell[0]===curCell[0]){count=0}else{count=1}startCell=prevCell}prevCell=curCell;prevRec=curRec;count++;merging=true;if(this.options.mergeType==="visual"){curCell.addClass(this.css.mergedCell)}else if(this.options.mergeType==="physical"){curCell.css("display","none")}if(i<dv.length-1&&i<sri+vrc){continue}}if(merging){args.count=count;args.record=prevRec;if(raiseEvents){this._trigger(this.events.cellsMerged,null,args)}if(this.options.mergeType==="visual"){prevCell.addClass(this.css.mergedCellsBottom)}else if(this.options.mergeType==="physical"){startCell.css("display","");startCell.attr("rowspan",count);startCell.addClass(this.css.physicallyMergedCell)}merging=false}prevRec=curRec;prevCell=curCell}},_unmergeColumn:function(key){var dataRows,cells;dataRows=this._dataRows(this.grid.hasFixedColumns()&&this.grid.isFixedColumn(key));cells=dataRows.children("td[aria-describedby='"+this.grid.id()+"_"+key+"']:not([gbsummarycell])");this._removeMergingFromCells(cells)},_unmergeColumns:function(){var dataRows,cells;dataRows=this._dataRows(null,true);cells=dataRows.children("td:not([gbsummarycell])");this._removeMergingFromCells(cells)},_removeMergingFromCells:function(cells){if(this.options.mergeType==="physical"){cells.removeAttr("rowspan").removeClass(this.css.physicallyMergedCell).css("display","table-cell")}else{cells.removeClass(this.css.mergedCellsTop).removeClass(this.css.mergedCell).removeClass(this.css.mergedCellsBottom)}},_createHandlers:function(){this._virtualRowsHandler=$.proxy(this._rrn,this);this._virtualColumnsHandler=$.proxy(this._rcn,this);this._columnsCollectionModifiedHandler=$.proxy(this._columnsCollectionModified,this);this._rowExpandedHandler=$.proxy(this._rowExpanded,this);this._rowCollapsedHandler=$.proxy(this._rowCollapsed,this)},_registerEvents:function(){this.grid.element.on({"iggridvirtualrecordsrender.cellmerging":this._virtualRowsHandler,"iggridvirtualhorizontalscroll.cellmerging":this._virtualColumnsHandler,"iggridcolumnscollectionmodified.cellmerging":this._columnsCollectionModifiedHandler,"ighierarchicalgridrowexpanded.cellmerging":this._rowExpandedHandler,"ighierarchicalgridrowcollapsed.cellmerging":this._rowCollapsedHandler})},_unregisterEvents:function(){this.grid.element.off(".cellmerging")},_injectGrid:function(gridInstance){this.grid=gridInstance;this._v=this.grid.options.virtualization===true||this.grid.options.rowVirtualization===true;this._createHandlers();this._unregisterEvents();this._registerEvents();this._initColumnSettings();this._createModel();this._prevSortedColumns=this._getSortedColumns()}});$.extend($.ui.igGridCellMerging,{version:"20.1.14"});return $});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});