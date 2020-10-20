/*!@license
* Infragistics.Web.ClientUI infragistics.undo.js resources 20.1.20201.120
*
* Copyright (c) 2011-2020 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/
(function(factory){if(typeof define==="function"&&define.amd){define([],factory)}else{factory()}})(function(){$=$||{};$.ig=$.ig||{};$.ig.locale=$.ig.locale||{};$.ig.locale.es=$.ig.locale.es||{};$.ig.locale.es.undo=$.ig.locale.es.undo||{};var l=$.ig.locale.es.undo;l["AddItemDescription"]="A\xf1adir {1}";l["AddItemDescriptionDetailed"]="A\xf1adir {1}";l["AddRangeDescription"]="A\xf1adir {1} {2}(s)";l["AddRangeDescriptionDetailed"]="A\xf1adir {1} {2}(s)";l["FallbackTransactionDescription"]="";l["LE_AddOpenTransaction"]="Cannot add an UndoTransaction that has not been opened or is still open.";l["LE_AddTransactionDirect"]="UndoTransaction cannot be added. The RootTransaction is automatically added upon Commit.";l["LE_AddUnitWhileTransactionOpen"]="Cannot add an UndoUnit while the transaction contains a nested open transaction '{0}'.";l["LE_ArgumentIsNegative"]="The '{0}' must be 0 or greater. Actual value: '{1}'";l["LE_CannotExecuteOpenTransaction"]="Cannot invoke Execute while the transaction '{0}' is open.";l["LE_ChangeHistoryInMerge"]="Cannot alter the Undo/Redo history while a Merge is being invoked";l["LE_ChangeHistoryInRemoveAll"]="Cannot alter the Undo/Redo history while the RemoveAll is being invoked.";l["LE_ChildTransactionNotInUnits"]="The specified child transaction '{0}' is not part of the Units of this transaction.";l["LE_ClosingOtherTransaction"]="The specified transaction '{0}' is not the currently open transaction '{1}'.";l["LE_EndTransactionWhileSuspended"]="Cannot close a transaction while the UndoManager is suspended.";l["LE_EnumEnded"]="The enumerator was completed.";l["LE_EnumFailedVersion"]="The collection was modified after the enumerator was started.";l["LE_EnumNotStarted"]="The enumerator was not started. Call MoveNext.";l["LE_FactoryNullTransaction"]="The UndoUnitFactory returned a null UndoTransaction.";l["LE_HasOpenTransaction"]="A transaction has already been opened.";l["LE_HistoryItemNotInCurrentHistory"]="The UndoHistoryItem does not exist within the associated Undo or Redo history in the UndoManager.";l["LE_InvalidTransactionOwner"]="The specified transaction's Owner is not this object.";l["LE_NeedAddRemoveAction"]="The specified action must be 'Add' or 'Remove'.";l["LE_NewTransactionWhileSuspended"]="A transaction cannot be started while the UndoManager is suspended.";l["LE_RangeCollectionAction"]="Range actions are not supported.";l["LE_ReferenceNotRegistered"]="The specified reference '{0}' has not been registered with an UndoManager instance. Use the RegisterReference method to register the reference with an UndoManager or pass null as the 'reference' to use the UndoManager.Current thread static/shared instance.";l["LE_ReferenceRegisteredToOther"]="The specified reference '{0}' is registered with a different UndoManager instance.";l["LE_RemoveAllFailedVersion"]="The collection was modified during the call to RemoveAll.";l["LE_ResetCollectionAction"]="Reset action is not supported.";l["LE_TargetCollectionIsReadOnly"]="The specified collection '{0}' cannot be read-only.";l["LE_TransactionAlreadyOpened"]="The transaction has already been opened.";l["LE_TransactionClosed"]="The transaction cannot be modified once it has been closed.";l["LE_TransactionNotOpened"]="The specified transaction '{0}' is not open.";l["LE_TransactionNotStarted"]="The transaction cannot be modified until it has been started.";l["LE_UndoManagerAsReference"]="An 'UndoManager' instance cannot be a reference.";l["LE_UndoRedoInRollback"]="Cannot perform an Undo/Redo while a Rollback is in progress.";l["LE_UndoRedoInTransaction"]="Cannot perform an undo/redo while a transaction is opened.";l["LE_UndoRedoInUndoRedo"]="Cannot perform an Undo/Redo while an Undo/Redo is in progress.";l["LE_UndoRedoWhileSuspended"]="Cannot perform an Undo/Redo while the UndoManager has been suspended.";l["MoveItemDescription"]="Mover {1}";l["MoveItemDescriptionDetailed"]="Mover {1} de '{2}' a '{3}'";l["PropertyChangeDescription"]="Cambiar {0} en {1}";l["PropertyChangeDescriptionDetailed"]="Cambiar {0} en {1} a '{2}'";l["ReinitializeCollectionDescription"]="Cambio en bloque {2}";l["ReinitializeCollectionDescriptionDetailed"]="Cambio en bloque {2}";l["RemoveItemDescription"]="Quitar {1}";l["RemoveItemDescriptionDetailed"]="Quitar {1}";l["RemoveRangeDescription"]="Quitar {1} {2}(s)";l["RemoveRangeDescriptionDetailed"]="Quitar {1} {2}(s)";l["ReplaceItemDescription"]="Sustituir {1}";l["ReplaceItemDescriptionDetailed"]="Sustituir '{1}' por '{2}'";$.ig.undo=$.ig.undo||{};$.ig.undo.locale=$.ig.undo.locale||l;return l});