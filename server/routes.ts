import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { logoRequestFormSchema } from "@shared/schema";
import { canvaService } from "./canva-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create logo request
  app.post("/api/logo-requests", async (req, res) => {
    try {
      const validatedData = logoRequestFormSchema.parse(req.body);
      
      const logoRequest = await storage.createLogoRequest(validatedData);
      
      // Generate logos using Canva AI
      console.log('Starting logo generation for:', validatedData.businessName);
      const generatedLogos = await canvaService.generateLogos(validatedData);
      
      // Update request with generated logos
      const updatedRequest = await storage.updateLogoRequestWithResults(logoRequest.id, generatedLogos);
      
      res.json(updatedRequest);
    } catch (error) {
      console.error("Error creating logo request:", error);
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Get logo request by ID
  app.get("/api/logo-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const logoRequest = await storage.getLogoRequest(id);
      
      if (!logoRequest) {
        return res.status(404).json({ message: "Logo request not found" });
      }
      
      res.json(logoRequest);
    } catch (error) {
      console.error("Error fetching logo request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
