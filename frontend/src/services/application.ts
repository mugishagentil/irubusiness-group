import { apiFetch } from "@/lib/utils";

export const InterviewApplicationsAPI = {
  create: (data: any) => {
    // Create FormData for file uploads
    const formData = new FormData();
    
    console.log('Processing form data:', data); // Debug log
    
    // Append all non-file fields
    Object.keys(data).forEach(key => {
      if (key === 'portraitUrl' || key === 'uploadDocsUrls' || key === 'signatureUrl') {
        // Skip file fields - they'll be handled separately
        return;
      }
      
      if (Array.isArray(data[key])) {
        // Handle arrays (channels, contentTypes)
        data[key].forEach((item: string) => {
          formData.append(key, item);
        });
      } else if (typeof data[key] === 'boolean') {
        formData.append(key, data[key].toString());
      } else if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });
    
    // FIXED: Handle files correctly with proper validation
    if (data.portraitUrl && data.portraitUrl instanceof File) {
      console.log('Adding portrait file:', data.portraitUrl.name);
      formData.append('portraitUrl', data.portraitUrl);
    }
    
    if (data.signatureUrl && data.signatureUrl instanceof File) {
      console.log('Adding signature file:', data.signatureUrl.name);
      formData.append('signatureUrl', data.signatureUrl);
    }
    
    if (data.uploadDocsUrls && data.uploadDocsUrls instanceof FileList && data.uploadDocsUrls.length > 0) {
      console.log('Adding upload docs:', data.uploadDocsUrls.length, 'files');
      Array.from(data.uploadDocsUrls).forEach((file: File) => {
        formData.append('uploadDocsUrls', file);
      });
    }

    // Debug: Log FormData contents
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    return apiFetch("/applications/interviews", {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary
    });
  },

  getAll: () => apiFetch("/applications/interviews"),

  getById: (id: string) => apiFetch(`/applications/interviews/${id}`),

  delete: (id: string) =>
    apiFetch(`/applications/interviews/${id}`, { method: "DELETE" }),
};

export const PartnershipApplicationsAPI = {
  create: (data: any) =>
    apiFetch("/applications/partners", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getAll: () => apiFetch("/applications/partners"),

  getById: (id: string) => apiFetch(`/applications/partners/${id}`),

  delete: (id: string) =>
    apiFetch(`/applications/partners/${id}`, { method: "DELETE" }),
};