import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { JobListSchema } from "./types/job.schema";
import { JobCountsSchema } from "./types/job-counts.schema";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function fetchJobs(params: {
  job_type: string;
  is_usa: boolean;
  company_type: string;
  location_filter?: string;
}) {
  if (!supabase) {
    throw new Error("Supabase client is not initialized.");
  }

  // For Canada positions, we'll fetch all international jobs and filter client-side
  // since the database RPC might not support location filtering
  const queryParams = {
    job_type: params.job_type,
    is_usa: params.is_usa,
    company_type: params.company_type,
  };

  const { data, error } = await supabase.rpc("get_jobs", queryParams);

  if (error) {
    throw new Error(`Supabase query error: ${error.message}`);
  }

  try {
    let jobs = JobListSchema.parse(data);
    
    // Client-side filtering for Canada locations
    if (params.location_filter === "Canada") {
      jobs = jobs.filter(job => {
        const location = job.job_locations?.toLowerCase() || "";
        return location.includes("canada") || 
               location.includes("toronto") || 
               location.includes("vancouver") || 
               location.includes("montreal") || 
               location.includes("ottawa") || 
               location.includes("calgary") || 
               location.includes("edmonton") || 
               location.includes("winnipeg") || 
               location.includes("quebec") || 
               location.includes("ontario") || 
               location.includes("british columbia") || 
               location.includes("alberta") || 
               location.includes("manitoba") || 
               location.includes("saskatchewan") || 
               location.includes("nova scotia") || 
               location.includes("new brunswick") || 
               location.includes("newfoundland") || 
               location.includes("prince edward island") || 
               location.includes("yukon") || 
               location.includes("northwest territories") || 
               location.includes("nunavut");
      });
    }
    
    // Note: We're now including ALL job types, not just software engineering
    // This broadens to include data science, product management, marketing, 
    // business, finance, operations, design, and other roles
    // No filtering needed here - we want to include everything
    
    return jobs;
  } catch (validationError) {
    throw new Error(`Data validation error: ${validationError}`);
  }
}

export async function fetchJobCounts() {
  if (!supabase) {
    throw new Error("Supabase client is not initialized.");
  }

  const { data, error } = await supabase.rpc("get_swe_job_counts");

  if (error) {
    throw new Error(`Supabase query error: ${error.message}`);
  }

  try {
    return JobCountsSchema.parse(data);
  } catch (validationError) {
    throw new Error(`Data validation error: ${validationError}`);
  }
}

