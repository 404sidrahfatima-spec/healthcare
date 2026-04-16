import subprocess, sys, os, venv

def setup_and_run():
    base_dir = os.path.dirname(__file__)
    backend_dir = os.path.join(base_dir, 'backend')
    venv_dir = os.path.join(backend_dir, 'venv')
    requirements_file = os.path.join(backend_dir, 'requirements.txt')
    
    # Define python executable inside venv
    if os.name == 'nt':
        venv_python = os.path.join(venv_dir, 'Scripts', 'python.exe')
    else:
        venv_python = os.path.join(venv_dir, 'bin', 'python')

    # Create virtual environment if it doesn't exist
    if not os.path.exists(venv_dir):
        print(f"Creating virtual environment in {venv_dir}...")
        venv.create(venv_dir, with_pip=True)

    # Install requirements
    print("Installing requirements...")
    subprocess.run([venv_python, "-m", "pip", "install", "-r", requirements_file], check=True)

    # Run the application
    print("Starting the backend server...")
    os.chdir(backend_dir)
    subprocess.run([venv_python, "-m", "uvicorn", "main:app", "--reload", "--port", "8000"])

if __name__ == "__main__":
    setup_and_run()
