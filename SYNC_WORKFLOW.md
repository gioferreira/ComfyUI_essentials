# Upstream Sync Workflow

This document outlines the steps to keep your local `multiple_lora_for_params` branch up-to-date with the original (upstream) repository.

## One-Time Setup

First, add the original repository as a remote named `upstream`.

```bash
git remote add upstream https://github.com/comfyorg/comfyui-essentials
```

Verify the remotes are set up correctly:

```bash
git remote -v
```

## Regular Sync Process

Follow these steps whenever you want to pull in the latest changes from the upstream project.

1.  **Fetch latest changes:**
    Download the latest commits from the `upstream` remote. This doesn't change your local files yet.
    ```bash
    git fetch upstream
    ```

2.  **Update your main branch:**
    Switch to your local `main` branch and merge the changes from the upstream `main` branch.
    ```bash
    git switch main
    git merge upstream/main
    ```

3.  **Update your feature branch:**
    Switch to your feature branch and rebase it on top of your newly updated `main` branch. This reapplies your custom commits after the upstream changes.
    ```bash
    git switch multiple_lora_for_params
    git rebase main
    ```

4.  **Push your changes:**
    Because rebasing rewrites commit history, you will need to force-push to your fork.
    ```bash
    git push --force-with-lease origin multiple_lora_for_params
    ```

### Conflict Resolution

If you encounter a merge conflict during the `rebase` step, Git will pause and ask you to resolve it.

- Open the conflicting file(s) in your editor.
- Edit the files to resolve the differences.
- Stage the resolved files with `git add <file>`.
- Continue the rebase with `git rebase --continue`.
