import { supabase } from './supabase';

/**
 * Utility functions for Supabase interactions
 */

/**
 * Fetch data from a Supabase table with optional filters
 * @param table The name of the table to query
 * @param queryOptions Optional query parameters
 * @returns The query result
 */
export async function fetchFromSupabase(
  table: string, 
  queryOptions?: {
    columns?: string;
    filters?: Record<string, any>;
    limit?: number;
    orderBy?: { column: string; ascending?: boolean };
  }
) {
  let query = supabase.from(table).select(queryOptions?.columns || '*');
  
  // Apply filters if provided
  if (queryOptions?.filters) {
    Object.entries(queryOptions.filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }
  
  // Apply ordering if provided
  if (queryOptions?.orderBy) {
    const { column, ascending = true } = queryOptions.orderBy;
    query = query.order(column, { ascending });
  }
  
  // Apply limit if provided
  if (queryOptions?.limit) {
    query = query.limit(queryOptions.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Supabase query error:', error);
    throw error;
  }
  
  return data;
}

/**
 * Insert data into a Supabase table
 * @param table The name of the table
 * @param data The data to insert
 * @returns The insert result
 */
export async function insertToSupabase(table: string, data: any) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();
  
  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }
  
  return result;
}

/**
 * Update data in a Supabase table
 * @param table The name of the table
 * @param data The data to update
 * @param match The column and value to match for the update
 * @returns The update result
 */
export async function updateInSupabase(
  table: string, 
  data: any, 
  match: { column: string; value: any }
) {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq(match.column, match.value)
    .select();
  
  if (error) {
    console.error('Supabase update error:', error);
    throw error;
  }
  
  return result;
}

/**
 * Delete data from a Supabase table
 * @param table The name of the table
 * @param match The column and value to match for deletion
 * @returns The delete result
 */
export async function deleteFromSupabase(
  table: string, 
  match: { column: string; value: any }
) {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq(match.column, match.value)
    .select();
  
  if (error) {
    console.error('Supabase delete error:', error);
    throw error;
  }
  
  return data;
}
