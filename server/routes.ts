import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFormSchema, insertRankGroupSchema, insertAvailableRankSchema, insertCrewMemberSchema, insertAppraisalResultSchema, insertRoleSchema, insertPermissionSchema, insertUserRoleSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Forms API routes
  app.get("/api/forms", async (req, res) => {
    try {
      const forms = await storage.getForms();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch forms" });
    }
  });

  app.get("/api/forms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const form = await storage.getForm(id);
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch form" });
    }
  });

  app.post("/api/forms", async (req, res) => {
    try {
      const result = insertFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid form data", details: result.error.issues });
      }
      const form = await storage.createForm(result.data);
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: "Failed to create form" });
    }
  });

  app.put("/api/forms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertFormSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid form data", details: result.error.issues });
      }
      const form = await storage.updateForm(id, result.data);
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: "Failed to update form" });
    }
  });

  app.delete("/api/forms/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteForm(id);
      if (!deleted) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete form" });
    }
  });

  // Rank Groups API routes
  app.get("/api/rank-groups/:formId", async (req, res) => {
    try {
      const formId = parseInt(req.params.formId);
      const rankGroups = await storage.getRankGroups(formId);
      res.json(rankGroups);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rank groups" });
    }
  });

  app.post("/api/rank-groups", async (req, res) => {
    try {
      const validatedData = insertRankGroupSchema.parse(req.body);
      const rankGroup = await storage.createRankGroup(validatedData);
      res.status(201).json(rankGroup);
    } catch (error) {
      res.status(400).json({ error: "Invalid rank group data" });
    }
  });

  app.put("/api/rank-groups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertRankGroupSchema.partial().parse(req.body);
      const rankGroup = await storage.updateRankGroup(id, validatedData);
      if (!rankGroup) {
        return res.status(404).json({ error: "Rank group not found" });
      }
      res.json(rankGroup);
    } catch (error) {
      res.status(400).json({ error: "Invalid rank group data" });
    }
  });

  app.delete("/api/rank-groups/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteRankGroup(id);
      if (!deleted) {
        return res.status(404).json({ error: "Rank group not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete rank group" });
    }
  });

  // Available Ranks API routes
  app.get("/api/available-ranks", async (req, res) => {
    try {
      const ranks = await storage.getAvailableRanks();
      res.json(ranks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch available ranks" });
    }
  });

  app.post("/api/available-ranks", async (req, res) => {
    try {
      const validatedData = insertAvailableRankSchema.parse(req.body);
      const rank = await storage.createAvailableRank(validatedData);
      res.status(201).json(rank);
    } catch (error) {
      res.status(400).json({ error: "Invalid rank data" });
    }
  });

  // Crew Members API routes
  app.get("/api/crew-members", async (req, res) => {
    try {
      const crewMembers = await storage.getCrewMembers();
      res.json(crewMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch crew members" });
    }
  });

  app.get("/api/crew-members/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const crewMember = await storage.getCrewMember(id);
      if (!crewMember) {
        return res.status(404).json({ error: "Crew member not found" });
      }
      res.json(crewMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch crew member" });
    }
  });

  app.post("/api/crew-members", async (req, res) => {
    try {
      const result = insertCrewMemberSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid crew member data", details: result.error.issues });
      }
      const crewMember = await storage.createCrewMember(result.data);
      res.status(201).json(crewMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to create crew member" });
    }
  });

  app.put("/api/crew-members/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = insertCrewMemberSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid crew member data", details: result.error.issues });
      }
      const crewMember = await storage.updateCrewMember(id, result.data);
      if (!crewMember) {
        return res.status(404).json({ error: "Crew member not found" });
      }
      res.json(crewMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to update crew member" });
    }
  });

  app.delete("/api/crew-members/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await storage.deleteCrewMember(id);
      if (!deleted) {
        return res.status(404).json({ error: "Crew member not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete crew member" });
    }
  });

  // Appraisal Results API routes
  app.get("/api/appraisals", async (req, res) => {
    try {
      const appraisals = await storage.getAppraisalResults();
      res.json(appraisals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appraisals" });
    }
  });

  app.get("/api/appraisals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const appraisal = await storage.getAppraisalResult(id);
      if (!appraisal) {
        return res.status(404).json({ error: "Appraisal not found" });
      }
      res.json(appraisal);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appraisal" });
    }
  });

  app.get("/api/appraisals/crew/:crewMemberId", async (req, res) => {
    try {
      const crewMemberId = req.params.crewMemberId;
      const appraisals = await storage.getAppraisalResultsByCrewMember(crewMemberId);
      res.json(appraisals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appraisals for crew member" });
    }
  });

  app.post("/api/appraisals", async (req, res) => {
    try {
      const result = insertAppraisalResultSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid appraisal data", details: result.error.issues });
      }
      const appraisal = await storage.createAppraisalResult(result.data);
      res.status(201).json(appraisal);
    } catch (error) {
      res.status(500).json({ error: "Failed to create appraisal" });
    }
  });

  app.put("/api/appraisals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertAppraisalResultSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid appraisal data", details: result.error.issues });
      }
      const appraisal = await storage.updateAppraisalResult(id, result.data);
      if (!appraisal) {
        return res.status(404).json({ error: "Appraisal not found" });
      }
      res.json(appraisal);
    } catch (error) {
      res.status(500).json({ error: "Failed to update appraisal" });
    }
  });

  app.delete("/api/appraisals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAppraisalResult(id);
      if (!deleted) {
        return res.status(404).json({ error: "Appraisal not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete appraisal" });
    }
  });

  // RBAC API routes
  app.get("/api/rbac/roles", async (req, res) => {
    try {
      // Return mock data for now since RBAC storage not implemented yet
      const roles = [
        {
          id: 1,
          name: "Super Admin",
          code: "SUPER_ADMIN",
          description: "Full system access",
          level: "Super Admin",
          category: "Shore",
          department: null,
          parentRoleId: null,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Vessel Master",
          code: "VESSEL_MASTER",
          description: "Master of vessel operations",
          level: "Admin",
          category: "Vessel",
          department: "Marine",
          parentRoleId: null,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Technical Manager",
          code: "TECHNICAL_MANAGER",
          description: "Technical department manager",
          level: "Admin",
          category: "Shore",
          department: "Technical",
          parentRoleId: null,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roles" });
    }
  });

  app.get("/api/rbac/permissions", async (req, res) => {
    try {
      // Return mock data for now
      const permissions = [
        {
          id: 1,
          name: "Create Users",
          code: "USERS_CREATE",
          description: "Create new user accounts",
          moduleId: null,
          resource: "users",
          action: "create",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Edit Technical Incidents",
          code: "EL4_INCIDENTS_EDIT",
          description: "Edit technical incidents",
          moduleId: 4,
          resource: "incidents",
          action: "update",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "View Crew Appraisals",
          code: "EL3_APPRAISALS_VIEW",
          description: "View crew appraisal results",
          moduleId: 3,
          resource: "appraisals",
          action: "read",
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch permissions" });
    }
  });

  app.get("/api/rbac/modules", async (req, res) => {
    try {
      // Return TMSA modules
      const modules = [
        {
          id: 1,
          name: "Element 1 - Management & Leadership",
          code: "EL1",
          description: "Management and leadership practices",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: "Element 2 - Shore HR Management",
          code: "EL2",
          description: "Shore-based human resources management",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: "Element 3 - Crewing Management",
          code: "EL3",
          description: "Crew management and appraisals",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          name: "Element 4 - Technical Management",
          code: "EL4",
          description: "Technical systems and maintenance",
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          name: "Element 5 - Navigation",
          code: "EL5",
          description: "Navigation and bridge operations",
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      res.json(modules);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  });

  app.post("/api/rbac/roles", async (req, res) => {
    try {
      const result = insertRoleSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid role data", details: result.error.issues });
      }
      // Mock response - in real implementation this would save to database
      const newRole = {
        id: Date.now(),
        ...result.data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      res.json(newRole);
    } catch (error) {
      res.status(500).json({ error: "Failed to create role" });
    }
  });

  app.post("/api/rbac/permissions", async (req, res) => {
    try {
      const result = insertPermissionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid permission data", details: result.error.issues });
      }
      // Mock response
      const newPermission = {
        id: Date.now(),
        ...result.data,
        createdAt: new Date().toISOString()
      };
      res.json(newPermission);
    } catch (error) {
      res.status(500).json({ error: "Failed to create permission" });
    }
  });

  app.post("/api/rbac/user-roles", async (req, res) => {
    try {
      const result = insertUserRoleSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid user role data", details: result.error.issues });
      }
      // Mock response
      const newUserRole = {
        id: Date.now(),
        ...result.data,
        assignedAt: new Date().toISOString()
      };
      res.json(newUserRole);
    } catch (error) {
      res.status(500).json({ error: "Failed to assign user role" });
    }
  });

  app.delete("/api/rbac/roles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // Mock response - in real implementation this would delete from database
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete role" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
