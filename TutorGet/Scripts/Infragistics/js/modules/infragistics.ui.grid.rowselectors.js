/*!@license
 * Infragistics.Web.ClientUI Grid Tooltips 20.1.14
 *
 * Copyright (c) 2011-2020 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.ui.grid.framework.js
 *	infragistics.ui.editors.js
 *	infragistics.ui.shared.js
 *	infragistics.dataSource.js
 *	infragistics.util.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.ui.grid.framework"],factory)}else{return factory(jQuery)}})(function($){"use strict";$.widget("ui.igGridRowSelectors",$.ui.igWidget,{options:{enableRowNumbering:true,enableCheckBoxes:false,rowNumberingSeed:0,rowSelectorColumnWidth:null,requireSelection:true,showCheckBoxesOnFocus:false,inherit:false,enableSelectAllForPaging:true,selectAllForPagingTemplate:null,deselectAllForPagingTemplate:null,locale:{selectedRecordsText:undefined,deselectedRecordsText:undefined,selectAllText:undefined,deselectAllText:undefined}},css:{rowSelector:"ui-iggrid-rowselector-class",rowSelectorSelected:"ui-iggrid-selectedcell ui-state-active",rowSelectorActivated:"ui-iggrid-activecell ui-state-focus",headerRowSelector:"ui-iggrid-rowselector-header",footerRowSelector:"ui-iggrid-rowselector-footer",checkBox:"ui-state-default ui-corner-all ui-igcheckbox-normal",checkBoxOff:"ui-icon ui-icon-check ui-igcheckbox-normal-off",checkBoxOn:"ui-icon ui-icon-check ui-igcheckbox-normal-on",nodeHovered:"ui-state-hover"},events:{rowSelectorClicked:"rowSelectorClicked",checkBoxStateChanging:"checkBoxStateChanging",checkBoxStateChanged:"checkBoxStateChanged"},_createWidget:function(){$.Widget.prototype._createWidget.apply(this,arguments);if(this.options.rowSelectorColumnWidth===null){this.options.rowSelectorColumnWidth=55;if(this.options.enableCheckBoxes===true&&this.options.enableRowNumbering===true){this.options.rowSelectorColumnWidth+=15}}},_create:function(){this._cIdx=0;this._functionsRedirected=false;this._hovTR=null;this._gridRenderRecord=null;this._checkBoxesShown=false;this._v=false;this._ms=false},destroy:function(){this._unregisterEvents();this._unregisterRowSelectorEvents();this._unregisterSelectAllEvents();if(this._gridRenderRecordHandler!==undefined){this.grid._renderRecord=this._gridRenderRecordHandler}if(this._gridRenderColgroupHandler&&this.grid._renderColgroup===this._renderColgroupHandler){this.grid._renderColgroup=this._gridRenderColgroupHandler}this._cleanInterface(false);if(this.grid._selection){this.grid._selection.removeSubscriber(this._subId,this.grid.id())}this._superApply(arguments);return this},_shouldRenderHeaderCheckBoxes:function(){return this.options.enableCheckBoxes===true&&this._ms},_renderHeaderRowSelectors:function(owner){var rows,i,cell,header,$thDataSkip;if(owner.id()!==this.grid.id()){return}rows=this.grid.headersTable().children("thead").children();if(rows.length>0){cell=rows.eq(0).find("th.ui-iggrid-expandheadercell").first();if(cell.length===0){this._index=0}else{this._index=cell.index()+1}if(this.grid._isMultiColumnGrid){$thDataSkip=$("<th></th>").prependTo(this.grid.headersTable().find("thead tr:nth-child(1)")).addClass(this.css.headerRowSelector).addClass(this.grid.css.headerClass).attr("data-role","rs").attr("data-skip","true");$thDataSkip.attr("rowspan",this.grid._maxLevel+1);if(this._shouldRenderHeaderCheckBoxes()){$(this._getCheckBox(true)).appendTo($thDataSkip)}}else{for(i=0;i<rows.length;i++){header=rows.eq(i).find("th[data-role='rs']");if(!rows.eq(i).find("th[data-role='rs']").length){header=$("<th>"+($.ig.util.isIE7?"&nbsp;":"")+"</th>").addClass(this.css.headerRowSelector).addClass(i===0?this.grid.css.headerClass:"").attr("data-role","rs").attr("data-skip","true").insertBefore(rows.eq(i).children().eq(this._index))}if(this._shouldRenderHeaderCheckBoxes()&&i===0&&!header.children().length){$(this._getCheckBox(true)).appendTo(header)}}}}},_renderFooterRowSelectors:function(owner){var rows,i;if(owner.id()!==this.grid.id()){return}rows=this.grid.footersTable().children("tfoot").children();if(rows.length>0){for(i=0;i<rows.length;i++){if(rows.eq(i).find("td[data-role='rs']").length>0){continue}$("<td>"+($.ig.util.isIE7?"&nbsp;":"")+"</td>").addClass(this.css.footerRowSelector).attr("data-role","rs").attr("data-skip","true").insertBefore(rows.eq(i).children().eq(this._index))}}},_headerRendered:function(event,ui){this._ms=!this._skipRefresh&&this._getSelectionInstance().options.multipleSelection===true;this._renderHeaderRowSelectors(ui.owner);this._getColumnFixingInstance()},_footerRendered:function(event,ui){this._renderFooterRowSelectors(ui.owner)},_getColumnFixingInstance:function(){if(!this._columnFixing&&this.grid.element.data("igGridColumnFixing")){this._columnFixing=this.grid.element.data("igGridColumnFixing")}return this._columnFixing},_getSelectionInstance:function(){if(!this._selection&&this.grid.element.data("igGridSelection")){this._selection=this.grid.element.data("igGridSelection")}return this._selection},_recordsRendering:function(event,ui){var i,vs,ds=this.grid.dataSource,data=ds._filteredData||ds.data(),gbIsApplied=ds.isGroupByApplied(),gbData=ds._gbData;if(this.grid.id()!==ui.owner.id()){return}vs=ui.vrtWnd.start&&ui.vrtWnd.end?ui.vrtWnd.start:0;vs+=this.grid.dataSource.pageIndex()*this.grid.dataSource.pageSize();if(gbIsApplied&&gbData&&gbData.length&&(ds.settings.groupby.pagingMode==="allRecords"||ds.settings.groupby.pagingMode==="dataRecordsOnly"&&!this.grid.element.data("igGridPaging"))){for(;vs<gbData.length;vs++){if(!gbData[vs].__gbRecord){break}}for(i=0;i<data.length;i++){if(data[i]===gbData[vs]){vs=i;break}}}this._cIdx=this._pIdx=vs;this._redirectFunctions();this._bindToSelectionCollection()},_virtRowCountDetermined:function(){this._cIdx=this._pIdx},_virtRowCountDetermining:function(){this._redirectFunctions()},_redirectFunctions:function(){if(this._functionsRedirected===false){this._renderRecordHandler=$.proxy(this._rsRenderRecord,this);this._gridRenderRecordHandler=$.proxy(this.grid._renderRecord,this.grid);this._gridRenderRecord=this._gridRenderRecordHandler;this.grid._renderRecord=this._renderRecordHandler}this._functionsRedirected=true},_recordsRendered:function(event,ui){if(this.grid.id()!==ui.owner.id()){return}if(this.options.enableCheckBoxes===true){this._updateHeader()}},_gridRendered:function(event,ui){if(ui===undefined){return}if(this.grid.id()!==ui.owner.id()){return}this._ms=!this._skipRefresh&&this._getSelectionInstance().options.multipleSelection===true;this._registerRowSelectorEvents()},_rsRenderColgroup:function(frc,rs,table,isHeader,isFooter,autofitLastColumn,md){var fdLeft,fixed,id=table.id;frc.apply(this,[table,isHeader,isFooter,autofitLastColumn,md]);if(rs.grid.hasFixedColumns()){fdLeft=this.fixingDirection()==="left";fixed=!!(md&&md.fixed);id=fdLeft&&fixed||!fdLeft&&!fixed?id:id+"_fixed";table=document.getElementById(id)}rs._rsRenderColgroupHelper(table)},rsRenderColgroup:function(){this._rsRenderColgroup.apply(this.grid,$.merge([this._gridRenderColgroupHandler,this],arguments))},_rsRenderColgroupHelper:function(table){var cgrp;cgrp=$(table).find("colgroup");if(cgrp.find("col[data-role='rs']").length===0){$("<col></col>").prependTo(cgrp).css("width",this.options.rowSelectorColumnWidth).attr("data-skip","true").attr("data-role","rs")}},_rsRenderRecord:function(data,rowIndex,isFixed){var markup=this._gridRenderRecord.apply(this,arguments),pre,app,idx,fCols=this.grid.hasFixedColumns(),fdLeft=this.grid.fixingDirection()==="left",rs;if(fCols&&!(isFixed&&fdLeft||!isFixed&&!fdLeft)){return markup}rs=this._getRowSelectorCellMarkup(isFixed&&!this.grid._fixedColumns.length?this._rowHasSelection(data):markup.indexOf("ui-iggrid-selectedcell")!==-1,data);idx=markup.indexOf("ui-iggrid-expandcolumn");if(idx>=0){app=markup.substr(idx);idx=idx+app.indexOf("</td>")+4;pre=markup.substring(0,idx+1);app=markup.substring(idx+1)}else{idx=markup.indexOf(">")+1;pre=markup.substring(0,idx);app=markup.substring(idx)}markup=pre+rs+app;return markup},_renderExtraHeaderCells:function(row,colgroup,prepend){this._renderExtraCells(row,colgroup,prepend,true)},_renderExtraFooterCells:function(row,colgroup,prepend,cssClass){this._renderExtraCells(row,colgroup,prepend,false,cssClass)},_renderExtraCells:function(row,colgroup,prepend,header,cssClass){var rHeader,rCol,index,cell;if(row.find("[data-role='rs']").length>0){return}if(header===true){rHeader=$("<th>"+($.ig.util.isIE7?"&nbsp;":"")+"</th>").addClass(this.css.headerRowSelector).attr("data-role","rs").attr("data-skip","true")}else{rHeader=$("<td>"+($.ig.util.isIE7?"&nbsp;":"")+"</td>").addClass(this.css.footerRowSelector).addClass(cssClass).attr("data-role","rs").attr("data-skip","true")}cell=row.find("th.ui-iggrid-expandheadercell,td.ui-iggrid-expandheadercellgb");if(cell.length===0){cell=row.children().first();index=0}else{index=cell.last().index()+1}if(index===0){rHeader.prependTo(row)}else{rHeader.insertBefore(row.children().eq(index))}if(colgroup){rCol=$("<col></col>").attr("data-skip","true").attr("data-role","rs").css("width",this.options.rowSelectorColumnWidth);rCol.insertBefore(colgroup.children().eq(index))}},_registerRowSelectorEvents:function(){this._unregisterRowSelectorEvents();this._allTables().on("click.rowselectors","th."+this.css.rowSelector,this._rsClickHandler);this._allTables().on({"click.rowselectors":this._checkboxClickHandler,"keydown.rowselectors":this._checkboxClickHandler,"mouseover.rowselectors":this._checkboxMouseOverHandler,"mouseout.rowselectors":this._checkboxMouseOutHandler},"th."+this.css.rowSelector+" span[name='chk']");this._allHeaderTables().on({"click.rowselectors":this._hCheckboxClickHandler,"keydown.rowselectors":this._hCheckboxClickHandler,"mouseover.rowselectors":this._checkboxMouseOverHandler,"mouseout.rowselectors":this._checkboxMouseOutHandler},"th."+this.css.headerRowSelector+" span[name='hchk']")},_unregisterRowSelectorEvents:function(){this._allHeaderTables().off(".rowselectors");this._allTables().off(".rowselectors")},_allTables:function(){var ft=this.grid.fixedTable();return ft.add(this.grid.element)},_allHeaderTables:function(){var fht=this.grid.fixedHeadersTable();return fht.add(this.grid.headersTable())},_checkboxMouseOver:function(event){$(event.target).closest("span[data-role='checkbox']").addClass(this.css.nodeHovered)},_checkboxMouseOut:function(event){$(event.target).closest("span[data-role='checkbox']").removeClass(this.css.nodeHovered)},_checkBoxClicked:function(event){if(event.type==="keydown"&&event.keyCode!==$.ui.keyCode.ENTER&&event.keyCode!==$.ui.keyCode.SPACE){return}var trg=$(event.target).closest("span[name='chk']"),rCell=trg.parent(),rRow=rCell.parent(),args,rIdx=this._getVisibleRowIndex(rRow),rKey=rRow.attr("data-id"),noCancel,state=trg.attr("data-chk");if(rKey===""||rKey===null||rKey===undefined){rKey=rIdx}args={row:rRow,rowIndex:rIdx,rowKey:rKey,rowSelector:rCell,owner:this,grid:this.grid,currentState:state,newState:state==="off"?"on":"off",isHeader:false};noCancel=this._triggerCheckingEvent(event,args);if(noCancel===true){this._handleCheck(trg);delete args.currentState;args.state=args.newState;delete args.newState;this._triggerCheckedEvent(event,args)}event.preventDefault();event.stopPropagation()},_headerCheckBoxClicked:function(event){var trg=$(event.target).closest("span[name='hchk']"),args,noCancel,state=trg.attr("data-chk");if(event.type==="keydown"&&event.keyCode!==$.ui.keyCode.ENTER&&event.keyCode!==$.ui.keyCode.SPACE){return}args={owner:this,grid:this.grid,currentState:state,newState:state==="off"?"on":"off",isHeader:true};noCancel=this._triggerCheckingEvent(event,args);if(noCancel===true){this._handleHeaderCheck(trg);delete args.currentState;args.state=args.newState;delete args.newState;this._triggerCheckedEvent(event,args)}event.stopPropagation();event.preventDefault()},_handleCheck:function(checkbox){var row,rowId,upd,sel,offset;if(!checkbox){return}upd=this.grid.element.data("igGridUpdating");sel=this._getSelectionInstance();offset=this._v?this.grid._startRowIndex:0;row=checkbox.parent().parent();if(this.grid.hasFixedColumns()&&sel){row=row.add(sel._getRowByIndex(row.index(),!this.grid._isFixedElement(row)))}rowId=this.grid._fixPKValue(row.attr("data-id"));if(rowId===null||rowId===undefined){rowId=row.closest("tbody").children("tr:not([data-container])").index(row)+offset}if(this.grid._selection.settings.owner!==this.grid){this.grid._selection.changeOwner(this.grid)}if(checkbox.attr("data-chk")==="off"){if(sel.options.activation){this.grid._selection.activate(rowId,row)}this.grid._selection.select(rowId,true,{element:row,checkbox:checkbox})}else{this.grid._selection.deselect(rowId,{element:row,checkbox:checkbox})}if(sel&&sel._suspend){if(upd){if(upd.findInvalid()){return}upd._endEdit(null,true)}else{return}}},_handleHeaderCheck:function(checkbox){var sel,go=this.grid.options,v=go.virtualization||go.rowVirtualization,toCheck=checkbox.attr("data-chk")==="off";sel=this._getSelectionInstance();if(this.grid._selection.settings.owner!==this.grid){this.grid._selection.changeOwner(this.grid)}if(toCheck){if(v||this.grid.dataSource.isGroupByApplied()){this._selectAllVirtualRows(sel)}else{this._selectAllRows(sel)}this._alterCheckbox(checkbox,true)}else{if(v||this.grid.dataSource.isGroupByApplied()){this._deselectAllVirtualRows(sel)}else{this._deselectAllRows(sel)}this._alterCheckbox(checkbox,false)}if(this.options.enableSelectAllForPaging&&this.grid.element.data("igGridPaging")){this._renderOverlayByCheckstate(toCheck)}},changeLocale:function(){var $overlay=this.grid.container().find("[data-rs-overlay]").first();if($overlay.length){$overlay.remove();this._renderOverlayByCheckstate($overlay.attr("data-rs-overlay")==="true")}},_registerWidget:$.noop,_unregisterWidget:$.noop,_renderOverlayByCheckstate:function(toCheck){var dataViewLength=this._getDataView().length,allCheckedRecs=this._getSelectionInstance().selectedRows().length,templateData=[{checked:dataViewLength,unchecked:dataViewLength,allCheckedRecords:allCheckedRecs,totalRecordsCount:this._getDSLocalRecords().length}];this._renderOverlay(templateData,toCheck)},_getDSLocalRecords:function(){var ds=this.grid.dataSource,trecCount=ds.totalLocalRecordsCount();if(ds._filteredData&&ds._filteredData.length>=trecCount){return ds._filteredData}return this._getAllData()},_renderOverlay:function(templateData,toCheck){var hTable=this.grid.headersTable(),overlay;if(toCheck){overlay=this._getSelectAllOverlay(templateData)}else{overlay=this._getDeselectAllOverlay(templateData)}if(overlay){overlay.css({"z-index":"1000",width:"100%",position:"absolute",top:(this.grid.options.height||this.grid.options.width?hTable.parent().igPosition().top:hTable.igPosition().top)+hTable.find("thead:first").outerHeight()});overlay.children("div:first").css("padding-left",this.options.rowSelectorColumnWidth);overlay.appendTo(this.grid.container());this._registerSelectAllEvents(overlay)}},_getSelectAllOverlay:function(templateData){var ti=this.grid.options.tabIndex,overlay,selectAllTemplate;if(templateData[0].allCheckedRecords>=templateData[0].totalRecordsCount){return null}if(this.options.selectAllForPagingTemplate){overlay=this._jsr?$($.render([this.grid.id()+"_selectAllForPagingTemplate"](templateData))):$($.ig.tmpl(this.options.selectAllForPagingTemplate,templateData))}else{selectAllTemplate=this._getLocaleValue("selectedRecordsText").replace("${checked}",templateData[0].checked)+" <a href='#' data-rs-select-all tabindex='"+ti+"'>"+this._getLocaleValue("selectAllText").replace("${totalRecordsCount}",templateData[0].totalRecordsCount)+"</a>";overlay=this._getDefaultOverlay(selectAllTemplate,true)}return overlay},_getDeselectAllOverlay:function(templateData){var ti=this.grid.options.tabIndex,overlay,deselectAllTemplate;if(templateData[0].allCheckedRecords===0){return null}if(this.options.deselectAllForPagingTemplate){overlay=this._jsr?$($.render([this.grid.id()+"_deselectAllForPagingTemplate"](templateData))):$($.ig.tmpl(this.options.deselectAllForPagingTemplate,templateData))}else{deselectAllTemplate=this._getLocaleValue("deselectedRecordsText").replace("${unchecked}",templateData[0].unchecked)+" <a href='#' data-rs-deselect-all tabindex='"+ti+"'>"+this._getLocaleValue("deselectAllText").replace("${totalRecordsCount}",templateData[0].totalRecordsCount)+"</a>";overlay=this._getDefaultOverlay(deselectAllTemplate,false)}return overlay},_getDefaultOverlay:function(template,toCheck){var ti=this.grid.options.tabIndex;return $("<div>").attr({"class":"ui-widget-header ui-priority-secondary","data-rs-overlay":!!toCheck,tabIndex:ti,id:this.grid.id()+(toCheck?"_":"_de")+"select_all_overlay"}).append($("<div>").html(template).append($("<div>").css("float","right").append($("<span>").addClass("ui-icon-close").addClass("ui-icon").addClass("ui-button").attr("data-rs-close-all","").attr("tabindex",ti))))},_registerSelectAllEvents:function(overlay){var self=this,overlayId=overlay.attr("id");this.grid.container().bind("mouseup.containerselectall",function(event){if(event.type==="mouseup"&&$(event.target).closest("#"+overlayId).length===0){$(this).unbind(".containerselectall");if($(overlay)){overlay.remove()}}});overlay.bind("blur.containerselectall",function(event){$(this).unbind(".containerselectall");if($(overlay)&&$(event.target).closest("#"+overlayId).length===0){overlay.remove()}});overlay.find("[data-rs-select-all]").bind("mouseup",function(event){self._selectAllFromOverlay();event.stopPropagation();overlay.remove()});overlay.find("[data-rs-deselect-all]").bind("mouseup",function(event){self._deselectAllFromOverlay();event.stopPropagation();overlay.remove()});overlay.find("[data-rs-select-all]").bind("keydown",function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){self._selectAllFromOverlay();overlay.remove()}});overlay.find("[data-rs-deselect-all]").bind("keydown",function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){self._deselectAllFromOverlay();overlay.remove()}});overlay.find("[data-rs-close-all]").bind("mouseup",function(event){event.stopPropagation();overlay.remove()});overlay.find("[data-rs-close-all]").bind("keydown",function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){overlay.remove()}})},_selectAllFromOverlay:function(){this._changeCheckStateForAllRecords(this._getSelectionInstance(),true)},_deselectAllFromOverlay:function(){this._changeCheckStateForAllRecords(this._getSelectionInstance(),false)},_unregisterSelectAllEvents:function(){if(this.grid.element.data("igGridPaging")&&this.options.enableSelectAllForPaging){this.grid.container().unbind(".containerselectall");$(this.grid.id()+"_select_all_overlay").remove();$(this.grid.id()+"_deselect_all_overlay").remove()}},_updateHeader:function(){var dv=this._getDataView(),dvl=dv.length,sl,i,check=!!dvl,selection=this._getSelectionInstance(),pk=selection._pkProp;if(this.grid.element.data("igGridPaging")){for(i=0;i<dvl;i++){if(!this.grid._selection.isSelected(pk!==null?dv[i][pk]:i,this.grid)){check=false;break}}}else{sl=this.grid._selection?this.grid._selection.selectionLength():0;if(this.grid.dataSource.isGroupByApplied()){if(sl<dvl){check=false}else{sl=this.grid._selection.selectedDataRows().length;check=sl===dvl}}else{check=sl===dvl&&this._isFirstRowSelected()}}this._alterCheckbox(this._headerCheckbox(),check)},_alterCheckbox:function(checkbox,check){var inner=checkbox.children().first();if(checkbox.length>0&&inner.length>0){if(check===true){checkbox.attr("data-chk","on");inner.removeClass(this.css.checkBoxOff).addClass(this.css.checkBoxOn)}else{checkbox.attr("data-chk","off");inner.removeClass(this.css.checkBoxOn).addClass(this.css.checkBoxOff)}}},_getRowSelectorCellMarkup:function(selected){var markup="";markup+='<th role="rowheader" tabindex="'+this.grid.options.tabIndex+'" class="'+this.css.rowSelector;if(selected){markup+=" "+this.css.rowSelectorSelected}markup+='"><span class="ui-icon ui-icon-triangle-1-e" style="margin-left: -5px"></span>';if(this.options.enableRowNumbering){markup+=this._getCurrentNumber()}if(this.options.enableCheckBoxes){markup+=this._getCheckBox(false,selected)}markup+="</th>";return markup},_getCheckBox:function(header,checked){var markup="";markup+='<span name="'+(header===true?"hchk":"chk")+'" ';markup+='data-chk="'+(checked?"on":"off")+'" ';markup+='data-role="checkbox" class="'+this.css.checkBox+' "';markup+='tabindex="'+this.grid.options.tabIndex+' "';if(this.options.showCheckBoxesOnFocus===true&&this._checkBoxesShown===false){markup+=' style="visibility: hidden;"'}markup+='><span class="'+(checked?this.css.checkBoxOn:this.css.checkBoxOff)+'">';markup+="</span></span>";return markup},_getCurrentNumber:function(){return'<span class="ui-iggrid-rowselector-row-number">'+(++this._cIdx+this.options.rowNumberingSeed)+"</span>"},_selectAllRows:function(selection){var checkboxes=this._allCheckboxes(),i,range=[],row,rowId;if(checkboxes.length===0){return}for(i=0;i<checkboxes.length;i++){row=checkboxes.eq(i).parent().parent();if(this.grid.hasFixedColumns()){if(this.grid.fixedBodyContainer().attr("data-fixing-direction")==="left"){row=row.add(this.grid.element.find("tbody > tr").eq(row.index()))}else{row=row.add(this.grid.fixedBodyContainer().find("tbody > tr").eq(row.index()))}}rowId=selection._pkProp?this.grid._fixPKValue(row.attr("data-id")):i;range.push({id:rowId,element:row,checkbox:checkboxes.eq(i)})}this._suspendHeader=true;this.grid._selection.rangeSelect(range,true,null,false,false);this._suspendHeader=false},_selectAllVirtualRows:function(selection){var dv=this._getDataView(),fr,lr,rangeStats;if(dv.length===0){return}if(selection._pkProp){fr=dv[0].__gbRecord?dv[0].id:dv[0][selection._pkProp];lr=dv[dv.length-1].__gbRecord?dv[dv.length-1].id:dv[dv.length-1][selection._pkProp]}else{fr=0;lr=dv.length-1}rangeStats=selection._getRecordRange(fr,lr,dv);this._suspendHeader=true;this.grid._selection.rangeSelect(rangeStats.range,true,null,false,false);if(this.grid.options.virtualizationMode==="continuous"){this.grid._correctScrollPosition(this.grid._getTotalRowsCount())}this._suspendHeader=false},_changeCheckStateForAllRecords:function(selection,toCheck){var dv=this._getDSLocalRecords(),fr,lr,rangeStats;if(dv.length===0){return}if(selection._pkProp){fr=dv[0][selection._pkProp];lr=dv[dv.length-1][selection._pkProp]}else{fr=0;lr=dv.length-1}rangeStats=selection._getRecordRange(fr,lr,dv);this._suspendHeader=true;if(toCheck){this.grid._selection.rangeSelect(rangeStats.range,true,null,rangeStats,false)}else{this.grid._selection.rangeDeselect(rangeStats.range,rangeStats,false)}this._suspendHeader=false},_deselectAllRows:function(selection){var checkboxes=this._allCheckboxes(),i,row,rowId,range=[];if(checkboxes.length===0){return}if(this.grid.element.data("igGridPaging")){for(i=0;i<checkboxes.length;i++){row=checkboxes.eq(i).parent().parent();if(this.grid.hasFixedColumns()){row=row.add(this.grid.scrollContainer().find("tbody > tr").eq(i))}rowId=selection._pkProp?this.grid._fixPKValue(row.attr("data-id")):i;range.push({id:rowId,element:row,checkbox:checkboxes.eq(i)})}this._suspendHeader=true;this.grid._selection.rangeDeselect(range,false,false);this._suspendHeader=false}else{this.grid._selection.deselectAll(false)}},_deselectAllVirtualRows:function(selection){var dv=this._getDataView(),rangeStats,fr,lr;if(dv.length===0){return}if(this.grid.element.data("igGridPaging")){if(selection._pkProp){fr=dv[0][selection._pkProp];lr=dv[dv.length-1][selection._pkProp]}else{fr=0;lr=dv.length-1}rangeStats=selection._getRecordRange(fr,lr,dv);this._suspendHeader=true;this.grid._selection.rangeDeselect(rangeStats.range,false,false);this._suspendHeader=false}else{this.grid._selection.deselectAll(false)}},_isFirstRowSelected:function(){var row=this.grid.element.find("tbody > tr:not([data-grouprow='true'],[data-summaryrow='true']):first"),rowId=row.attr("data-id");rowId=rowId!==null&&rowId!==undefined?this.grid._fixPKValue(rowId):this.grid.dataSource.pageIndex()*this.grid.dataSource.pageSize();return this.grid._selection.isSelected(rowId,this.grid)},_rowHasSelection:function(data){var sel=this._getSelectionInstance(),rowId=data[this.grid.options.primaryKey||"ig_pk"];if(!sel||rowId===null||rowId===undefined){return false}if(sel.options.mode==="cell"){return this.grid._selection.atLeastOneSelected(rowId,sel)}return this.grid._selection.isSelected(rowId,this.grid)},_rsRenderVirtualRecords:function(event,ui){var i=0,rs,rows,rowsLen;this._cIdx=0;if(this.grid.hasFixedColumns()&&this._getColumnFixingInstance().options.fixingDirection==="left"){rows=ui.fixedRows}else{rows=ui.rows}rowsLen=rows.length;for(i;i<rowsLen;i++){rs=$(this._getRowSelectorCellMarkup());rs.prependTo(rows.eq(i))}this._bindToSelectionCollection()},_rrn:function(){var rs=this._allRowSelectorCells(),cb=this._allCheckboxes(),cbx,i=0,self=this,sri=this.grid._startRowIndex||0,row,rowId;if(this.grid.options.virtualizationMode==="fixed"){for(i=0;i<rs.length;i++){rs.eq(i).removeClass(this.css.nodeHovered);if(this.options.enableRowNumbering===true){rs.eq(i).children("span.ui-iggrid-rowselector-row-number").text(sri+i+this.options.rowNumberingSeed+1)}}}if(!this._skipRefresh){rs.removeClass(this.css.rowSelectorSelected);cb.map(function(){self._alterCheckbox($(this),false)});for(i=0;i<rs.length;i++){row=rs.eq(i).closest("tr");rowId=this.grid._fixPKValue(row.attr("data-id"));if(rowId===null||rowId===undefined){rowId=i+sri}if(this.grid._selection.selection[rowId]!==undefined){rs.eq(i).addClass(this.css.rowSelectorSelected);cbx=cb.eq(i);if(cbx.length===1){this._alterCheckbox(cbx,true)}}}}},_bindToSelectionCollection:function(){if(this.grid._selection&&!this._subId){this._subId=this.grid._selection.addSubscriber(this,this.grid.id())}},_select:function(info){var res;info.element=info.element||this.grid._selection.elementFromIdentifier(info.id);res=this._rowSelectorFromSelection(info);if(!res){return}res.rowSelector.addClass(this.css.rowSelectorSelected);if(this.options.enableCheckBoxes){this._alterCheckbox(res.checkbox,true);if(this._ms&&!this._suspendHeader){this._updateHeader()}}},_deselect:function(info){var res,shouldDeselect;info.element=info.element||this.grid._selection.elementFromIdentifier(info.id);res=this._rowSelectorFromSelection(info);if(!res||!res.rowSelector.length){return}shouldDeselect=this.grid._selection instanceof $.ig.SelectedRowsCollection||!this.grid._selection.atLeastOneSelected(this.grid._fixPKValue(info.element.parent().attr("data-id")));if(shouldDeselect){res.rowSelector.removeClass(this.css.rowSelectorSelected);if(this.options.enableCheckBoxes){this._alterCheckbox(res.checkbox,false);if(this._ms&&!this._suspendHeader){this._updateHeader()}}}},_activate:function(element){if(element.is("th")){element.addClass(this.css.rowSelectorActivated)}},_deactivate:function(){if(this.grid.hasFixedColumns()){this.grid.fixedBodyContainer().find("tbody").find("th.ui-iggrid-activecell").removeClass(this.css.rowSelectorActivated)}this.grid.element.find("tbody").find("th.ui-iggrid-activecell").removeClass(this.css.rowSelectorActivated)},_clearSelection:function(){var rsCells,self=this;if(this.grid.hasFixedColumns()&&this.grid.fixingDirection()==="left"){rsCells=this.grid.fixedBodyContainer().find("tbody").find("th.ui-iggrid-selectedcell").removeClass(this.css.rowSelectorSelected)}else{rsCells=this.grid.element.children("tbody").find("th.ui-iggrid-selectedcell").removeClass(this.css.rowSelectorSelected)}if(this.options.enableCheckBoxes){$.each(rsCells,function(){self._alterCheckbox($(this).children("span:last"),false)});this._alterCheckbox(this._headerCheckbox(),false)}},_cellClick:function(event){var args,target=$(event.target),fRow,rCell=target.closest("th"),rRow=rCell.parent(),rIdx=this._getVisibleRowIndex(rRow),rKey=rRow.attr("data-id"),fdCell,gridContainer,sel=this._getSelectionInstance();if(this.options.showCheckBoxesOnFocus===true&&this._checkBoxesShown===false){this._animateCheckboxes(true)}if(!sel){return}if(target.is("span")&&target.attr("unselectable")){return}if(rKey===""||rKey===null||rKey===undefined){rKey=rIdx}if(this.grid.hasFixedColumns()){if(this.grid._isFixedElement(rCell)){if(this.grid.options.virtualization||this.grid.options.rowVirtualization){gridContainer=this.grid._vdisplaycontainer()}else{gridContainer=this.grid.scrollContainer()}fRow=rRow;rRow=gridContainer.find("tbody > tr").eq(fRow.index())}else{fRow=this.grid.fixedBodyContainer().find("tbody > tr").eq(rRow.index())}}fdCell=this._getFirstDataCell(rRow,fRow);if(event.shiftKey&&this._ms){sel._shiftSelectChange(fdCell)}else{sel._singleSelectChange(fdCell,event.ctrlKey||event.metaKey)}args={row:rRow,fixedRow:fRow,rowIndex:rIdx,rowKey:rKey,rowSelector:rCell,owner:this,grid:this.grid};this._triggerClickEvent(event,args)},_getFirstDataCell:function(row,frow){if(frow&&frow.length>0){frow.children("td").not("[data-skip='true'],[data-parent='true']").first()}return row.children("td").not("[data-skip='true'],[data-parent='true']").first()},_mouseHoverRow:function(event){var par,tag,tr=event.target;while(tr){par=tr.parentNode;tag=tr.nodeName;if(tag==="TR"&&par.nodeName==="TBODY"){break}tr=tag==="TABLE"?null:par}if(this._hovTR!==tr){this._mouseHoverRowHelper(this._hovTR,tr);if(this.grid.hasFixedColumns()){this._mouseHoverFixedRow($(this._hovTR),$(tr))}this._hovTR=tr}},_mouseHoverRowHelper:function(hovTr,tr){if(hovTr&&$(hovTr).attr("data-container")!=="true"){$("th."+this.css.rowSelector,hovTr).removeClass(this.css.nodeHovered)}if(tr&&$(tr).attr("data-container")!=="true"){$("th."+this.css.rowSelector,tr).addClass(this.css.nodeHovered)}},_mouseHoverFixedRow:function($hovTR,$tr){var $fHTR,$fTR,ind;ind=$hovTR.index();$fHTR=this.grid.fixedBodyContainer().find("tr:nth-child("+(ind+1)+")");ind=$tr.index();$fTR=this.grid.fixedBodyContainer().find("tr:nth-child("+(ind+1)+")");this._mouseHoverRowHelper($fHTR,$fTR)},_mouseLeaveRow:function(){var ind,$fHTR;if(this._hovTR){$("th",this._hovTR).removeClass(this.css.nodeHovered);if(this.grid.hasFixedColumns()){ind=$(this._hovTR).index();$fHTR=this.grid.fixedBodyContainer().find("tr:nth-child("+(ind+1)+")");$fHTR.find("th").removeClass(this.css.nodeHovered)}this._hovTR=null}},_triggerClickEvent:function(event,args){this._trigger(this.events.rowSelectorClicked,event,args)},_triggerCheckingEvent:function(event,args){return this._trigger(this.events.checkBoxStateChanging,event,args)},_triggerCheckedEvent:function(event,args){this._trigger(this.events.checkBoxStateChanged,event,args)},_getVisibleRowIndex:function(row){return row.closest("tbody").children("tr:not([data-container='true'],[data-grouprow='true'],[data-summaryrow='true'])").index(row)},_getVisibleHRowIndex:function(row){return row.closest("tbody").children("tr:not([data-container='true'])").index(row)},_animateCheckboxes:function(trans){var h=this._headerCheckbox(),c=this._allCheckboxes(),all=h.add(c);if(trans===true){all.css("visibility","visible").css("opacity",0).animate({opacity:1},1e3)}else{all.css("opacity",1e3).animate({opacity:0},1e3,function(){$(this).css("visibility","hidden")})}this._checkBoxesShown=trans},_cleanInterface:function(isRebind){var header,footer,cols,rsCells,w;if(isRebind===true){this._alterCheckbox(this._headerCheckbox(),false);return}cols=this.grid.element.children("colgroup").children("[data-role='rs']");cols=cols.add(this.grid.fixedBodyContainer().find("colgroup").children("[data-role='rs']"));if(this.grid.options.fixedHeaders===true){cols=cols.add(this.grid.headersTable().children("colgroup").children("[data-role='rs']"));cols=cols.add(this.grid.fixedHeadersTable().children("colgroup").children("[data-role='rs']"))}if(this.grid.options.fixedFooters===true){cols=cols.add(this.grid.footersTable().children("colgroup").children("[data-role='rs']"));cols=cols.add(this.grid.fixedFootersTable().children("colgroup").children("[data-role='rs']"))}footer=this._footerRowSelectorCells();header=this._headerRowSelectorCells();rsCells=this._allRowSelectorCells();if(!this.grid.options.width&&this._functionsRedirected){w=this.grid.container().css("width");if(w&&!w.endsWith("%")){this.grid.container().css("width",parseInt(w,10)-this.options.rowSelectorColumnWidth)}}cols.remove();footer.remove();header.remove();rsCells.remove()},_allRowSelectorCells:function(){var rowSelectors,grid=this.grid;if(grid.hasFixedColumns()&&this._getColumnFixingInstance().options.fixingDirection==="left"){
if(grid.options.virtualization||grid.options.rowVirtualization){rowSelectors=grid.fixedBodyContainer().find("tbody > tr > th."+this.css.rowSelector)}else{rowSelectors=grid.fixedBodyContainer().find("tbody > tr > th."+this.css.rowSelector)}}else{rowSelectors=grid.element.children("tbody").children("tr").children("th."+this.css.rowSelector)}return rowSelectors},_headerRowSelectorCells:function(){var headerCells=this.grid.headersTable().children("thead").find("th[data-role='rs']");if(headerCells.length===0&&this.grid.hasFixedColumns()){headerCells=this.grid.fixedHeadersTable().children("thead").find("th[data-role='rs']")}return headerCells},_footerRowSelectorCells:function(){var footerCells=this.grid.footersTable().children("tfoot").find("td[data-role='rs']");if(footerCells.length===0&&this.grid.hasFixedColumns()){footerCells=this.grid.fixedFootersTable().children("tfoot").find("td[data-role='rs']")}return footerCells},_allCheckboxes:function(){var checkboxes=this.grid.element.children("tbody").children("tr").children("th").find("span[name='chk']");if(checkboxes.length===0&&this.grid.hasFixedColumns()&&this._getColumnFixingInstance().options.fixingDirection==="left"){checkboxes=this.grid.fixedBodyContainer().find("tbody > tr > th span[name='chk']")}return checkboxes},_headerCheckbox:function(){var checkbox=this.grid.headersTable().children("thead").find("tr > th span[name='hchk']");if(checkbox.length===0&&this.grid.hasFixedColumns()&&this._getColumnFixingInstance().options.fixingDirection==="left"){checkbox=this.grid.fixedHeadersTable().children("thead").find("tr > th span[name='hchk']")}return checkbox},_rowSelectorFromSelection:function(info){var element=info.element,rs,checkbox=info.checkbox,fixingDir;if(element.is("th")){return}if(checkbox){rs=checkbox.parent()}else{if(element.is("tr")||element.length===2){rs=element.children("th:first")}else if(this.grid.hasFixedColumns()){fixingDir=this.grid.fixedBodyContainer().attr("data-fixing-direction");if(fixingDir==="left"&&!this.grid._isFixedElement(element)){rs=this.grid.fixedBodyContainer().find("tbody > tr").eq(element.closest("tr").index()).children("th:first")}else if(fixingDir==="right"&&this.grid._isFixedElement(element)){rs=this.grid.element.find("tbody > tr").eq(element.closest("tr").index()).children("th:first")}}if(!rs){rs=element.closest("tr").children("th:first")}checkbox=this.options.enableCheckBoxes?rs.children("span:last"):null}return{rowSelector:rs,checkbox:checkbox}},_checkForSelection:function(){var i,isSelection=false;for(i=0;i<this.grid.options.features.length;i++){if(this.grid.options.features[i].name==="Selection"){isSelection=true;if(this.options.enableCheckBoxes===true){this.grid.options.features[i].mode="row"}break}}if(isSelection===false){if(this.options.requireSelection===true){throw new Error(this._getLocaleValue("selectionNotLoaded"))}this._skipRefresh=true}},_checkForColumnVirtualization:function(){return this.grid.options.virtualizationMode!=="continuous"&&(this.grid.options.virtualization===true&&this.grid.options.width||this.grid.options.columnVirtualization===true)},_checkForRequireSelectionWithCheckboxes:function(){return this.options.requireSelection===false&&this.options.enableCheckBoxes===true},_createHandlers:function(){this._headerRenderedHandler=$.proxy(this._headerRendered,this);this._footerRenderedHandler=$.proxy(this._footerRendered,this);this._recordsRenderingHandler=$.proxy(this._recordsRendering,this);this._recordsRenderedHandler=$.proxy(this._recordsRendered,this);this._gridRenderedHandler=$.proxy(this._gridRendered,this);this._virtualDomBuiltHandler=$.proxy(this._rsRenderVirtualRecords,this);this._virtualRowsHandler=$.proxy(this._rrn,this);this._renderExtraHeaderCellHandler=$.proxy(this._renderExtraHeaderCells,this);this._renderExtraFooterCellHandler=$.proxy(this._renderExtraFooterCells,this);this._rsClickHandler=$.proxy(this._cellClick,this);this._rrHoverHandler=$.proxy(this._mouseHoverRow,this);this._rrLeaveHandler=$.proxy(this._mouseLeaveRow,this);this._checkboxMouseOverHandler=$.proxy(this._checkboxMouseOver,this);this._checkboxMouseOutHandler=$.proxy(this._checkboxMouseOut,this);this._checkboxClickHandler=$.proxy(this._checkBoxClicked,this);this._hCheckboxClickHandler=$.proxy(this._headerCheckBoxClicked,this)},_registerEvents:function(){this.grid.element.bind("iggridheaderrendered",this._headerRenderedHandler);this.grid.element.bind("iggridfooterrendered",this._footerRenderedHandler);this.grid.element.bind("iggridrowsrendering ",this._recordsRenderingHandler);this.grid.element.bind("iggridrowsrendered",this._recordsRenderedHandler);this.grid.element.bind("iggriddatarendered",this._gridRenderedHandler);this.grid.element.bind("iggridvirtualdombuilt",this._virtualDomBuiltHandler);this.grid.element.bind("iggridvirtualrecordsrender",this._virtualRowsHandler)},_unregisterEvents:function(){this.grid.element.unbind("iggridheaderrendered",this._headerRenderedHandler);this.grid.element.unbind("iggridfooterrendered",this._footerRenderedHandler);this.grid.element.unbind("iggridrowsrendering ",this._recordsRenderingHandler);this.grid.element.unbind("iggridrowsrendered",this._recordsRenderedHandler);this.grid.element.unbind("iggriddatarendered",this._gridRenderedHandler);this.grid.element.unbind("iggridvirtualdombuilt",this._virtualDomBuiltHandler);this.grid.element.unbind("iggridvirtualrecordsrender",this._virtualRowsHandler)},_injectGrid:function(gridInstance,isRebind){if(isRebind===true){this._cleanInterface(true);return}this.grid=gridInstance;this._v=this.grid.options.virtualization===true||this.grid.options.rowVirtualization===true;this._gridRenderColgroupHandler=$.proxy(this.grid._renderColgroup,this.grid);this._renderColgroupHandler=$.proxy(this.rsRenderColgroup,this);this._createHandlers();this.grid._headerInitCallbacks.push({type:"RowSelectors",func:this._renderExtraHeaderCellHandler});this.grid._footerInitCallbacks.push({type:"RowSelectors",func:this._renderExtraFooterCellHandler});this._registerEvents();this.grid._renderColgroup=this._renderColgroupHandler;this._checkForSelection();if(this._checkForColumnVirtualization()){throw new Error(this._getLocaleValue("columnVirtualizationEnabled"))}if(this._checkForRequireSelectionWithCheckboxes()){throw new Error(this._getLocaleValue("requireSelectionWithCheckboxes"))}if(String(this.grid.options.templatingEngine).toLowerCase()==="jsrender"){this._jsr=true;if(this.options.selectAllForPagingTemplate&&typeof this.options.selectAllForPagingTemplate==="string"){$.templates(this.grid.id()+"_selectAllForPagingTemplate",this.options.selectAllForPagingTemplate)}if(this.options.deselectAllForPagingTemplate&&typeof this.options.deselectAllForPagingTemplate==="string"){$.templates(this.grid.id()+"_deselectAllForPagingTemplate",this.options.deselectAllForPagingTemplate)}}},_getAllData:function(){return this.grid.dataSource.data()},_getDataView:function(){if(this.grid.dataSource.isGroupByApplied()){return this.grid.dataSource.dataView()}return this.grid._getDataView()}});$.extend($.ui.igGridRowSelectors,{version:"20.1.14"});return $});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});