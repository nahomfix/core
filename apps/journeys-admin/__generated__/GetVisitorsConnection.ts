/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VisitorStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetVisitorsConnection
// ====================================================

export interface GetVisitorsConnection_visitorsConnection_edges_node {
  __typename: "Visitor";
  id: string;
  /**
   * Status of the visitor as populated by VisitorUpdate mutation.
   */
  status: VisitorStatus | null;
  /**
   * The name of the visitor as populated by VisitorUpdate mutation or
   * SignUpEventSubmissionEventCreate mutation.
   */
  name: string | null;
  /**
   * The last time the visitor called the ButtonClickEvent mutation where the url
   * is in the format of a recognized chat platform.
   */
  lastChatStartedAt: any | null;
  /**
   * The time when the visitor created their first event on a journey connected
   * to the requested team.
   */
  createdAt: any;
}

export interface GetVisitorsConnection_visitorsConnection_edges {
  __typename: "VisitorEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetVisitorsConnection_visitorsConnection_edges_node;
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
}

export interface GetVisitorsConnection_visitorsConnection_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface GetVisitorsConnection_visitorsConnection {
  __typename: "VisitorsConnection";
  /**
   * A list of edges.
   */
  edges: GetVisitorsConnection_visitorsConnection_edges[];
  /**
   * Information to aid in pagination.
   */
  pageInfo: GetVisitorsConnection_visitorsConnection_pageInfo;
}

export interface GetVisitorsConnection {
  /**
   * A list of visitors that are connected with a specific team.
   */
  visitorsConnection: GetVisitorsConnection_visitorsConnection;
}

export interface GetVisitorsConnectionVariables {
  after?: string | null;
  first: number;
  teamId: string;
}
