/*!@license
* Infragistics.Web.ClientUI infragistics.categorychart.js 20.1.20201.120
*
* Copyright (c) 2011-2020 Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends:
*     jquery-1.4.4.js
*     jquery.ui.core.js
*     jquery.ui.widget.js
*     infragistics.util.js
*     infragistics.ext_core.js
*     infragistics.ext_collections.js
*     infragistics.dv_core.js
*     infragistics.dv_dataseriesadapter.js
*     infragistics.datachart_category.js
*     infragistics.datachart_categorycore.js
*     infragistics.datachart_domainChart.js
*     infragistics.datachart_core.js
*     infragistics.ext_ui.js
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.util","./infragistics.ext_core","./infragistics.ext_collections","./infragistics.dv_core","./infragistics.dv_dataseriesadapter","./infragistics.datachart_category","./infragistics.datachart_categorycore","./infragistics.datachart_domainChart","./infragistics.datachart_core","./infragistics.ext_ui"],factory)}else{factory(igRoot)}})(function($){$.ig=$.ig||{};var $$t={};$.ig.globalDefs=$.ig.globalDefs||{};$.ig.globalDefs.$$ad=$$t;$$0=$.ig.globalDefs.$$0;$$4=$.ig.globalDefs.$$4;$$1=$.ig.globalDefs.$$1;$$w=$.ig.globalDefs.$$w;$$x=$.ig.globalDefs.$$x;$$f=$.ig.globalDefs.$$f;$$g=$.ig.globalDefs.$$g;$$dc=$.ig.globalDefs.$$dc;$$j=$.ig.globalDefs.$$j;$$6=$.ig.globalDefs.$$6;$$a=$.ig.globalDefs.$$a;$.ig.$currDefinitions=$$t;$.ig.util.bulkDefine([]);var $a=$.ig.intDivide,$b=$.ig.util.cast,$c=$.ig.util.defType,$d=$.ig.util.defEnum,$e=$.ig.util.getBoxIfEnum,$f=$.ig.util.getDefaultValue,$g=$.ig.util.getEnumValue,$h=$.ig.util.getValue,$i=$.ig.util.intSToU,$j=$.ig.util.nullableEquals,$k=$.ig.util.nullableIsNull,$l=$.ig.util.nullableNotEquals,$m=$.ig.util.toNullable,$n=$.ig.util.toString$1,$o=$.ig.util.u32BitwiseAnd,$p=$.ig.util.u32BitwiseOr,$q=$.ig.util.u32BitwiseXor,$r=$.ig.util.u32LS,$s=$.ig.util.unwrapNullable,$t=$.ig.util.wrapNullable,$u=String.fromCharCode,$v=$.ig.util.castObjTo$t,$w=$.ig.util.compareSimple,$x=$.ig.util.tryParseNumber,$y=$.ig.util.tryParseNumber1,$z=$.ig.util.numberToString,$0=$.ig.util.numberToString1,$1=$.ig.util.parseNumber,$2=$.ig.util.compare,$3=$.ig.util.replace,$4=$.ig.util.stringFormat,$5=$.ig.util.stringFormat1,$6=$.ig.util.stringFormat2,$7=$.ig.util.stringCompare1,$8=$.ig.util.stringCompare2,$9=$.ig.util.stringCompare3;$d("CategoryChartType:b",false,false,{Line:0,Area:1,Column:2,Point:3,StepLine:4,StepArea:5,Spline:6,SplineArea:7,Waterfall:8,Auto:9});$c("CategoryChart:a","XYChart",{gj:function(){$.ig.XYChart.prototype.gj.call(this);if(this.dataChart()==null){return}var a=this.dataChart()._bn._i.e();this.negativeBrushes(a._d);this.negativeOutlines(a._e);if(this.xAxisLabelTextColor()==null){this.xAxisLabelTextColor(a._k)}if(this.yAxisLabelTextColor()==null){this.yAxisLabelTextColor(a._k)}},gl:function(a,b){$.ig.XYChart.prototype.gl.call(this,a,b);a.transitionInDuration(this.transitionInDuration());a.transitionInEasingFunction(this.transitionInEasingFunction())},g4:function(a,b,c){var $self=this;$.ig.XYChart.prototype.g4.call(this,a,b,c);switch(a){case"TransitionInDuration":this.qu(function(d){d.transitionInDuration($self.transitionInDuration())});break;case"TransitionInEasingFunction":this.qu(function(d){d.transitionInEasingFunction($self.transitionInEasingFunction())});break}},p3:0,transitionInDuration:function(a){if(arguments.length===1){var b=this.transitionInDuration();if(a!=b){this.p3=a;this.g3("TransitionInDuration",b,this.transitionInDuration())}return a}else{return this.p3}},o7:null,transitionInEasingFunction:function(a){if(arguments.length===1){var b=this.transitionInEasingFunction();if(a!=b){this.o7=a;this.g3("TransitionInEasingFunction",b,this.transitionInEasingFunction())}return a}else{return this.o7}},exportSerializedVisualData:function(){var cvd_=this.exportVisualData();cvd_.scaleByViewport();return cvd_.serialize()},ge:function(a){$.ig.XYChart.prototype.ge.call(this,a);a.animateSeriesWhenAxisRangeChanges(this.animateSeriesWhenAxisRangeChanges())},gk:function(a,b){$.ig.XYChart.prototype.gk.call(this,a,b);var c=$b($.ig.HorizontalAnchoredCategorySeries.prototype.$type,a);if(c==null){return}c.markerCollisionAvoidance(this.markerCollisionAvoidance());c.isTransitionInEnabled(this.isTransitionInEnabled());c.transitionInMode(this.transitionInMode());c.transitionInSpeedType(this.transitionInSpeedType());c.trendLineBrush($.ig.ArrayUtil.prototype.a($$a.$at.$type,this.trendLineBrushes(),b));c.trendLineType(this.trendLineType());c.trendLineThickness(this.trendLineThickness());c.markerType(this.ai(a,b));if(a.isNegativeColorSupported()){a.setNegativeColors($.ig.ArrayUtil.prototype.a($$a.$at.$type,this.negativeBrushes(),b),$.ig.ArrayUtil.prototype.a($$a.$at.$type,this.negativeOutlines(),b))}},ox:function(){return new $.ig.CategoryXAxis},o1:function(){return new $.ig.NumericYAxis},f3:function(){this.xAxis(this.ox());this.xAxis().name("xAxis");var a=this.xAxis();a.propertyChanged=$.ig.Delegate.prototype.combine(a.propertyChanged,this.qw.runOn(this));this.yAxis(this.o1());this.yAxis().name("yAxis");var b=this.yAxis();b.propertyChanged=$.ig.Delegate.prototype.combine(b.propertyChanged,this.qx.runOn(this));if(this.xAxis().labelSettings()==null){this.xAxis().labelSettings(new $.ig.AxisLabelSettings)}if(this.yAxis().labelSettings()==null){this.yAxis().labelSettings(new $.ig.AxisLabelSettings)}},m5:function(a){$.ig.XYChart.prototype.m5.call(this,a);a.abbreviateLargeNumbers(this.yAxisAbbreviateLargeNumbers())},or:0,chartType:function(a){if(arguments.length===1){if(a!=this.or){var b=this.chartType();this.or=a;this.g3("ChartType",$$t.$b.getBox(b),$$t.$b.getBox(this.chartType()))}return a}else{return this.or}},ot:0,markerCollisionAvoidance:function(a){if(arguments.length===1){var b=this.markerCollisionAvoidance();if(a!=b){this.ot=a;this.g3("MarkerCollisionAvoidance",$.ig.CategorySeriesMarkerCollisionAvoidance.prototype.getBox(b),$.ig.CategorySeriesMarkerCollisionAvoidance.prototype.getBox(this.markerCollisionAvoidance()))}return a}else{return this.ot}},pb:false,isTransitionInEnabled:function(a){if(arguments.length===1){var b=this.isTransitionInEnabled();if(a!=b){this.pb=a;this.g3("IsTransitionInEnabled",b,this.isTransitionInEnabled())}return a}else{return this.pb}},ov:0,transitionInMode:function(a){if(arguments.length===1){var b=this.transitionInMode();if(a!=b){this.ov=a;this.g3("TransitionInMode",$.ig.CategoryTransitionInMode.prototype.getBox(b),$.ig.CategoryTransitionInMode.prototype.getBox(this.transitionInMode()))}return a}else{return this.ov}},o5:0,transitionInSpeedType:function(a){if(arguments.length===1){var b=this.transitionInSpeedType();if(a!=b){this.o5=a;this.g3("TransitionInSpeedType",$.ig.TransitionInSpeedType.prototype.getBox(b),$.ig.TransitionInSpeedType.prototype.getBox(this.transitionInSpeedType()))}return a}else{return this.o5}},pk:0,xAxisInterval:function(a){if(arguments.length===1){var b=this.xAxisInterval();if(a!=b){this.pk=a;this.g3("XAxisInterval",b,this.xAxisInterval())}return a}else{return this.pk}},pl:0,xAxisMinorInterval:function(a){if(arguments.length===1){var b=this.xAxisMinorInterval();if(a!=b){this.pl=a;this.g3("XAxisMinorInterval",b,this.xAxisMinorInterval())}return a}else{return this.pl}},pj:0,xAxisGap:function(a){if(arguments.length===1){var b=this.xAxisGap();if(a!=b){this.pj=a;this.g3("XAxisGap",b,this.xAxisGap())}return a}else{return this.pj}},pm:0,xAxisOverlap:function(a){if(arguments.length===1){var b=this.xAxisOverlap();if(a!=b){this.pm=a;this.g3("XAxisOverlap",b,this.xAxisOverlap())}return a}else{return this.pm}},pn:0,yAxisInterval:function(a){if(arguments.length===1){var b=this.yAxisInterval();if(a!=b){this.pn=a;this.g3("YAxisInterval",b,this.yAxisInterval())}return a}else{return this.pn}},pd:false,yAxisIsLogarithmic:function(a){if(arguments.length===1){var b=this.yAxisIsLogarithmic();if(a!=b){this.pd=a;this.g3("YAxisIsLogarithmic",b,this.yAxisIsLogarithmic())}return a}else{return this.pd}},p4:0,yAxisLogarithmBase:function(a){if(arguments.length===1){var b=this.yAxisLogarithmBase();if(a!=b){this.p4=a;this.g3("YAxisLogarithmBase",b,this.yAxisLogarithmBase())}return a}else{return this.p4}},pp:0,yAxisMinimumValue:function(a){if(arguments.length===1){var b=this.yAxisMinimumValue();if(a!=b){this.pp=a;this.g3("YAxisMinimumValue",b,this.yAxisMinimumValue())}return a}else{return this.pp}},po:0,yAxisMaximumValue:function(a){if(arguments.length===1){var b=this.yAxisMaximumValue();if(a!=b){this.po=a;this.g3("YAxisMaximumValue",b,this.yAxisMaximumValue())}return a}else{return this.po}},pq:0,yAxisMinorInterval:function(a){if(arguments.length===1){var b=this.yAxisMinorInterval();if(a!=b){this.pq=a;this.g3("YAxisMinorInterval",b,this.yAxisMinorInterval())}return a}else{return this.pq}},xAxisActualMinimum:function(){return this.xAxis().lb()},xAxisActualMaximum:function(){return this.xAxis().la()},yAxisActualMinimum:function(){return this.yAxis().actualMinimumValue()},yAxisActualMaximum:function(){return this.yAxis().actualMaximumValue()},on:null,negativeBrushes:function(a){if(arguments.length===1){var b=this.negativeBrushes();if(a!=b){this.on=a;this.g3("NegativeBrushes",b,this.negativeBrushes())}return a}else{return this.on}},oo:null,negativeOutlines:function(a){if(arguments.length===1){var b=this.negativeOutlines();if(a!=b){this.oo=a;this.g3("NegativeOutlines",b,this.negativeOutlines())}return a}else{return this.oo}},pc:false,yAxisAbbreviateLargeNumbers:function(a){if(arguments.length===1){var b=this.yAxisAbbreviateLargeNumbers();if(a!=b){this.pc=a;this.g3("YAxisAbbreviateLargeNumbers",b,this.yAxisAbbreviateLargeNumbers())}return a}else{return this.pc}},o9:false,isCategoryHighlightingEnabled:function(a){if(arguments.length===1){var b=this.isCategoryHighlightingEnabled();if(a!=b){this.o9=a;this.g3("IsCategoryHighlightingEnabled",b,this.isCategoryHighlightingEnabled())}return a}else{return this.o9}},pa:false,isItemHighlightingEnabled:function(a){if(arguments.length===1){var b=this.isItemHighlightingEnabled();if(a!=b){this.pa=a;this.g3("IsItemHighlightingEnabled",b,this.isItemHighlightingEnabled())}return a}else{return this.pa}},init:function(){this.p3=1e3;this.or=9;this.ot=1;this.pn=NaN;this.p4=10;this.pp=NaN;this.po=NaN;this.pc=true;this.o9=false;this.pa=false;$.ig.XYChart.prototype.init.call(this);this.f6()},b5:function(){return function(){var $ret=new $$4.x($.ig.DataSeriesType.prototype.$type,0);$ret.add(2);$ret.add(1);$ret.add(0);$ret.add(10);$ret.add(6);$ret.add(7);$ret.add(5);$ret.add(4);$ret.add(8);return $ret}()},qw:function(a,b){switch(b.propertyName()){case"ActualMinimum":this.ha("XAxisActualMinimum");break;case"ActualMaximum":this.ha("XAxisActualMaximum");break}},qx:function(a,b){switch(b.propertyName()){case"ActualMinimumValue":this.ha("YAxisActualMinimum");break;case"ActualMaximumValue":this.ha("YAxisActualMaximum");break}},hl:function(){$.ig.XYChart.prototype.hl.call(this);this.xAxis().label(this.xAxisLabel()==null?$.ig.XYChart.prototype.kx(this.xAxis(),this._v.dataSeries()):this.xAxisLabel());this.xAxis().itemsSource(this.dataChart()!=null&&this.dataChart().series().count()>0?this.dataChart().series().__inner[0].itemsSource():null)},_xAxis:null,xAxis:function(a){if(arguments.length===1){this._xAxis=a;return a}else{return this._xAxis}},_yAxis:null,yAxis:function(a){if(arguments.length===1){this._yAxis=a;return a}else{return this._yAxis}},o0:function(a,b){switch(a){case 2:return this.ar(1);case 3:return this.ar(10);case 0:return this.ar(0);case 1:return this.ar(2);case 6:return this.ar(6);case 7:return this.ar(7);case 4:return this.ar(4);case 5:return this.ar(5);case 8:return this.ar(8);case 9:return this.oz(b);default:return this.ar(1)}},oz:function(a){return this.ar(a)},u:function(a){switch(this.chartType()){case 1:return 2;case 0:return 0;case 3:return 10;case 6:return 6;case 7:return 7;case 5:return 5;case 4:return 4;case 8:return 8;case 9:return a.suggestedSeries();default:case 2:return 1}},aq:function(a,b){var c=this.o0(this.chartType(),a.suggestedSeries());c.valueMemberPath(a.findMatchingHint(0).path());c.xAxis(this.xAxis());c.yAxis(this.yAxis());return c},hj:function(a){if(a.suggestedSecondaryAxis()==2){this.yAxis().isLogarithmic(true);this.yAxis().logarithmBase(10)}},hm:function(){this.yAxis().isLogarithmic(this.yAxisIsLogarithmic());this.yAxis().logarithmBase(this.yAxisLogarithmBase())},b4:function(){return function(){var $ret=new $$4.x($.ig.IDataSeriesAdapterRule.prototype.$type,0);$ret.add(new $.ig.SimpleCategorySeriesRule);$ret.add(new $.ig.SubCollectionsRule);return $ret}()},f1:function(a,b){var c=$b($.ig.HorizontalAnchoredCategorySeries.prototype.$type,a);if(c!=null){c.markerCollisionAvoidance(this.markerCollisionAvoidance());c.markerType(this.ai(a,b))}},qu:function(a){this.qv(function(b,c){a(b)})},qv:function(a){if(this.dataChart()==null){return}for(var b=0;b<this.dataChart().series().count();b++){var c=$b($.ig.HorizontalAnchoredCategorySeries.prototype.$type,this.dataChart().series().__inner[b]);if(c==null){continue}a(c,b)}},h9:function(){return this.xAxis()},ia:function(){return this.yAxis()},o3:function(){return this.ar(30)},o4:function(){return this.ar(31)},b1:function(a,b){var c=$.ig.XYChart.prototype.b1.call(this,a,b);if(c!=null){var d=new $$4.x($.ig.Series.prototype.$type,0);if(this.o9){d.add(this.o3())}if(this.pa){d.add(this.o4())}for(var e=0;e<d.count();e++){var f=d.__inner[e];f.name(a+f.getType().typeName());c.add(f)}}return c},hq:function(a,b,c){$.ig.XYChart.prototype.hq.call(this,a,b,c);if(this._v.dataSeries().count()>0){if(String.isNullOrEmpty(this.calloutsXMemberPath())){this.ac().setXMemberPath(a,c.getMemberPathFor(16))}if(String.isNullOrEmpty(this.calloutsYMemberPath())){this.ac().setYMemberPath(a,c.getMemberPathFor(0))}if(String.isNullOrEmpty(this.calloutsLabelMemberPath())){this.ac().setLabelMemberPath(a,c.getMemberPathFor(0))}if(String.isNullOrEmpty(this.calloutsContentMemberPath())){this.ac().setContentMemberPath(a,c.getMemberPathFor(0))}}},g3:function(a,b,c){var $self=this;$.ig.XYChart.prototype.g3.call(this,a,b,c);switch(a){case"ChartType":this.hl();break;case"MarkerCollisionAvoidance":this.qu(function(d){d.markerCollisionAvoidance($self.markerCollisionAvoidance())});break;case"IsTransitionInEnabled":this.qu(function(d){d.isTransitionInEnabled($self.isTransitionInEnabled())});break;case"TransitionInMode":this.qu(function(d){d.transitionInMode($self.transitionInMode())});break;case"TransitionInSpeedType":this.qu(function(d){d.transitionInSpeedType($self.transitionInSpeedType())});break;case"XAxisInterval":this.xAxis().interval(this.xAxisInterval());break;case"XAxisMinorInterval":this.xAxis().minorInterval(this.xAxisMinorInterval());break;case"XAxisGap":this.xAxis().gap(this.xAxisGap());break;case"XAxisOverlap":this.xAxis().overlap(this.xAxisOverlap());break;case"YAxisInterval":this.yAxis().interval(this.yAxisInterval());break;case"YAxisIsLogarithmic":this.yAxis().isLogarithmic(this.yAxisIsLogarithmic());break;case"YAxisLogarithmBase":this.yAxis().logarithmBase(this.yAxisLogarithmBase());break;case"YAxisMinimumValue":this.yAxis().minimumValue(this.yAxisMinimumValue());break;case"YAxisMaximumValue":this.yAxis().maximumValue(this.yAxisMaximumValue());break;case"YAxisMinorInterval":this.yAxis().minorInterval(this.yAxisMinorInterval());break;case"NegativeBrushes":case"NegativeOutlines":this.qv(function(d,e){if(d.isNegativeColorSupported()){d.setNegativeColors($.ig.ArrayUtil.prototype.a($$a.$at.$type,$self.negativeBrushes(),e),$.ig.ArrayUtil.prototype.a($$a.$at.$type,$self.negativeOutlines(),e))}});break;case"YAxisAbbreviateLargeNumbers":this.nb(function(d){d.abbreviateLargeNumbers($self.yAxisAbbreviateLargeNumbers())});break;case"IsCategoryHighlightingEnabled":case"IsItemHighlightingEnabled":this.hl();break}},$type:new $.ig.Type("CategoryChart",$.ig.XYChart.prototype.$type)},true)});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});